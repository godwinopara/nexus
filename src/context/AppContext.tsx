"use client";

import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
    AppContextType,
    AppState,
    IAccount,
    INotification,
    ITransaction,
} from "@/app/dashboard/user/types/type";
import emailjs from "@emailjs/browser";

// Define action types
type Action =
    | { type: "SET_USER"; payload: AppState["user"] }
    | { type: "SET_TRANSACTIONS"; payload: AppState["transactions"] }
    | { type: "SET_ACCOUNTS"; payload: AppState["accounts"] }
    | { type: "SET_NOTIFICATIONS"; payload: AppState["notifications"] }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_ERROR"; payload: string | null }
    | { type: "CLEAR_ERROR" }
    | { type: "RESET_STATE" };

// Initial state
const initialState: AppState = {
    user: null,
    loading: false,
    error: null,
    transactions: [],
    accounts: [
        {
            id: "acc-1",
            name: "Checking Account",
            type: "Checking",
            number: `**** **** **** 4390`,
            balance: 0.0,
        },
        {
            id: "acc-2",
            name: "Savings Account",
            type: "Savings",
            number: `**** **** **** 5678`,
            balance: 0.0,
        },
    ],
    notifications: [],
};

// Create context with additional functionalities
const AppContext = createContext<AppContextType | null>(null);

// Reducer function
function appReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
            };
        case "SET_TRANSACTIONS":
            return {
                ...state,
                transactions: action.payload,
            };
        case "SET_ACCOUNTS":
            return {
                ...state,
                accounts: action.payload,
            };
        case "SET_NOTIFICATIONS":
            return {
                ...state,
                notifications: action.payload,
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload,
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
            };
        case "CLEAR_ERROR":
            return {
                ...state,
                error: null,
            };
        case "RESET_STATE":
            return initialState;
        default:
            return state;
    }
}

// Provider component
const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const router = useRouter();

    // Authentication functions
    const register = async (
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        country: string
    ) => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userData: AppState["user"] = {
                uid: user.uid,
                fullName: `${firstName} ${lastName}`,
                email,
                password,
                country,
                role: "user",
                accountNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
                status: "active",
                kycStatus: "pending",
                phoneNumber: "",
                address: "",
                sortcode: "",
                occupation: "",
                dateOfBirth: "",
                gender: "",
            };

            const transactions: ITransaction[] = [];
            const accounts: IAccount[] = [
                {
                    id: "acc-1",
                    name: "Checking Account",
                    type: "Checking",
                    number: `**** **** **** 4390`,
                    balance: 0.0,
                },
                {
                    id: "acc-2",
                    name: "Savings Account",
                    type: "Savings",
                    number: `**** **** **** 5678`,
                    balance: 0.0,
                },
            ];
            const notifications: INotification[] = [];

            await Promise.all([
                setDoc(doc(db, "users", user.uid), userData),
                setDoc(doc(db, "transactions", user.uid), { transactions: transactions }),
                setDoc(doc(db, "accounts", user.uid), { accounts: accounts }),
                setDoc(doc(db, "notifications", user.uid), { notifications: notifications }),
            ]);

            dispatch({ type: "SET_USER", payload: userData });
            dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
            dispatch({ type: "SET_ACCOUNTS", payload: accounts });
            dispatch({ type: "SET_NOTIFICATIONS", payload: notifications });

            return userData;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    const login = async (
        accountNumber: string,
        password: string
    ): Promise<AppState["user"] | null | undefined> => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            // First find user by account number in Firestore
            const q = query(collection(db, "users"), where("accountNumber", "==", accountNumber));

            const snapshot = await getDocs(q);
            if (snapshot.empty) throw new Error("Account not found");

            // 2. Get the associated email
            const userData = snapshot.docs[0].data() as AppState["user"];
            if (!userData?.email) throw new Error("No email linked to this account");

            // 3. Use Firebase's built-in auth
            const userCredential = await signInWithEmailAndPassword(auth, userData.email, password);
            const user = userCredential.user;

            // Get all related data
            const [transactions, accounts, notifications] = await Promise.all([
                getUserTransactions(user.uid),
                getUserAccounts(user.uid),
                getUserNotifications(user.uid),
            ]);

            // Update state with all data
            dispatch({ type: "SET_USER", payload: userData as AppState["user"] });
            dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
            dispatch({ type: "SET_ACCOUNTS", payload: accounts });
            dispatch({ type: "SET_NOTIFICATIONS", payload: notifications });

            return userData;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            throw error;
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            dispatch({ type: "RESET_STATE" });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
        }
    };

    const getUserData = async (userId: string): Promise<AppState["user"] | null> => {
        try {
            const userDoc = await getDoc(doc(db, "users", userId));
            if (userDoc.exists()) {
                return userDoc.data() as AppState["user"];
            }
            return null;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            return null;
        }
    };

    const updateUserData = async (userId: string, data: Partial<NonNullable<AppState["user"]>>) => {
        try {
            await updateDoc(doc(db, "users", userId), data);
            const updatedData = await getUserData(userId);
            dispatch({ type: "SET_USER", payload: updatedData });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
        }
    };

    const createTransaction = async (userId: string, transactionData: ITransaction) => {
        try {
            const transactionRef = doc(collection(db, "transactions"));
            const transaction = {
                ...transactionData,
                userId,
                createdAt: new Date().toISOString(),
            };
            await setDoc(transactionRef, transaction);
            return { id: transactionRef.id, ...transaction };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            return null;
        }
    };

    const getUserTransactions = async (userId: string): Promise<ITransaction[]> => {
        try {
            const transactionsQuery = query(
                collection(db, "transactions"),
                where("userId", "==", userId)
            );
            const querySnapshot = await getDocs(transactionsQuery);
            const transactions = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as ITransaction),
            }));
            dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
            return transactions;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            return [];
        }
    };

    const getUserNotifications = async (userId: string): Promise<INotification[]> => {
        try {
            const notificationsQuery = query(
                collection(db, "notifications"),
                where("userId", "==", userId)
            );
            const querySnapshot = await getDocs(notificationsQuery);
            return querySnapshot.docs.map((doc) => ({
                ...(doc.data() as INotification),
                id: doc.id,
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            return [];
        }
    };

    const getUserAccounts = async (userId: string): Promise<IAccount[]> => {
        try {
            const accountsRef = await getDoc(doc(db, "accounts", userId));

            if (accountsRef.exists()) {
                const accounts = accountsRef.data().accounts as IAccount[];

                dispatch({ type: "SET_ACCOUNTS", payload: accounts });
                return accounts;
            }
            return [];
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            return [];
        }
    };

    const updateUserBalance = async (
        userId: string,
        accountType: string,
        transactionType: string,
        amount: number
    ) => {
        try {
            const accountDocRef = doc(db, "accounts", userId);
            const accountDoc = await getDoc(accountDocRef);

            if (accountDoc.exists()) {
                const accounts = accountDoc.data().accounts as IAccount[];
                const account = accounts.find((account) => account.name === accountType);

                if (account) {
                    if (transactionType === "deposit") {
                        account.balance += amount;
                    } else {
                        account.balance -= amount;
                    }
                }

                await updateDoc(accountDocRef, { accounts: accounts });
                dispatch({ type: "SET_ACCOUNTS", payload: accounts });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await getUserData(user.uid);

                if (!userData) {
                    router.push("/auth");
                }

                const transactions = await getUserTransactions(user.uid);
                const accounts = await getUserAccounts(user.uid);
                const notifications = await getUserNotifications(user.uid);

                dispatch({ type: "SET_USER", payload: userData });
                dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
                dispatch({ type: "SET_ACCOUNTS", payload: accounts });
                dispatch({ type: "SET_NOTIFICATIONS", payload: notifications });
            } else {
                dispatch({ type: "RESET_STATE" });
                router.push("/auth");
            }
        });

        return () => unsubscribe();
    }, [router]);

    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    // Function to send OTP via EmailJS
    const sendOTP = async (email: string, otp: string) => {
        const templateParams = {
            email: email,
            passcode: otp,
        };

        try {
            await emailjs.send(
                "nexus-service",
                "template_oqv1ieq",
                templateParams,
                "U6Moe5eoKexHqUey4"
            );
        } catch (error) {
            console.error("Error sending OTP:", error);
            throw error;
        }
    };

    const sendAccountNumber = async (name: string, email: string, accountNumber: string) => {
        const templateParams = {
            name: name,
            accountNumber: accountNumber,
            email: email,
        };

        try {
            await emailjs.send(
                "nexus-service",
                "template_cei5ch8",
                templateParams,
                "U6Moe5eoKexHqUey4"
            );
        } catch (error) {
            console.error("Error sending account number:", error);
            throw error;
        }
    };

    // Function to verify OTP
    const verifyOTP = (inputOTP: string, generatedOTP: string) => {
        return inputOTP === generatedOTP;
    };

    return (
        <AppContext.Provider
            value={{
                state,
                register,
                login,
                logout,
                updateUserData,
                createTransaction,
                generateOTP,
                sendOTP,
                verifyOTP,
                sendAccountNumber,
                updateUserBalance,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the app context
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};

export { AppContext, AppProvider };
