// Types for our data structure
export interface User {
    id: string;
    email: string;
    password: string;
    role: "user" | "admin";
    name: string;
    status: "active" | "pending" | "suspended";
    kycStatus: "verified" | "pending" | "rejected";
    registrationDate: string;
    lastLogin: string;
}

export interface Account {
    id: string;
    userId: string;
    type: "checking" | "savings" | "credit";
    name: string;
    number: string;
    balance: number;
}

export interface Transaction {
    id: string;
    userId: string;
    userName: string;
    type: "deposit" | "withdrawal" | "transfer";
    amount: number;
    date: string;
    status: "completed" | "pending" | "failed";
    method: "bank_transfer" | "debit_card" | "internal";
    description: string;
}

export interface Ticket {
    id: string;
    userId: string;
    userName: string;
    issue: string;
    status: "open" | "in_progress" | "resolved";
    date: string;
    description: string;
}

export interface Session {
    id: string;
    role: "user" | "admin";
    email: string;
    name: string;
}

// Initialize localStorage with default data if it doesn't exist
export const initializeLocalStorage = () => {
    // Check if localStorage has been initialized
    if (!localStorage.getItem("initialized")) {
        // Default users
        const defaultUsers: User[] = [
            {
                id: "U001",
                email: "user@example.com",
                password: "user123",
                role: "user",
                name: "John Doe",
                status: "active",
                kycStatus: "verified",
                registrationDate: "2023-01-15 10:30 AM",
                lastLogin: "2023-03-22 09:15 AM",
            },
            {
                id: "A001",
                email: "admin@example.com",
                password: "admin123",
                role: "admin",
                name: "Admin User",
                status: "active",
                kycStatus: "verified",
                registrationDate: "2022-12-01 08:00 AM",
                lastLogin: "2023-03-21 14:45 PM",
            },
            {
                id: "U002",
                email: "jane@example.com",
                password: "jane123",
                role: "user",
                name: "Jane Smith",
                status: "active",
                kycStatus: "verified",
                registrationDate: "2023-02-10 11:20 AM",
                lastLogin: "2023-03-20 16:30 PM",
            },
        ];

        // Default accounts
        const defaultAccounts: Account[] = [
            {
                id: "ACC001",
                userId: "U001",
                type: "checking",
                name: "Checking Account",
                number: "**** **** **** 4582",
                balance: 12546.8,
            },
            {
                id: "ACC002",
                userId: "U001",
                type: "savings",
                name: "Savings Account",
                number: "**** **** **** 7891",
                balance: 48752.35,
            },
            {
                id: "ACC003",
                userId: "U002",
                type: "checking",
                name: "Checking Account",
                number: "**** **** **** 3456",
                balance: 8975.2,
            },
            {
                id: "ACC004",
                userId: "U002",
                type: "savings",
                name: "Savings Account",
                number: "**** **** **** 9012",
                balance: 25430.15,
            },
        ];

        // Default transactions
        const defaultTransactions: Transaction[] = [
            {
                id: "TRX001",
                userId: "U001",
                userName: "John Doe",
                type: "deposit",
                amount: 5000.0,
                date: "2023-03-15 09:35 AM",
                status: "completed",
                method: "bank_transfer",
                description: "Direct deposit from Bank of America",
            },
            {
                id: "TRX002",
                userId: "U001",
                userName: "John Doe",
                type: "withdrawal",
                amount: 1200.0,
                date: "2023-03-10 14:22 PM",
                status: "completed",
                method: "bank_transfer",
                description: "Withdrawal to Chase Bank",
            },
            {
                id: "TRX003",
                userId: "U002",
                userName: "Jane Smith",
                type: "deposit",
                amount: 3000.0,
                date: "2023-03-12 13:45 PM",
                status: "completed",
                method: "debit_card",
                description: "Deposit via Mastercard ending in 8765",
            },
            {
                id: "TRX004",
                userId: "U002",
                userName: "Jane Smith",
                type: "transfer",
                amount: 500.0,
                date: "2023-03-08 11:05 AM",
                status: "completed",
                method: "internal",
                description: "Transfer to Savings Account",
            },
        ];

        // Default tickets
        const defaultTickets: Ticket[] = [
            {
                id: "TCK001",
                userId: "U001",
                userName: "John Doe",
                issue: "Deposit delay",
                status: "open",
                date: "2023-03-18 10:15 AM",
                description:
                    "My deposit from March 15 is still pending. It should have been processed by now.",
            },
            {
                id: "TCK002",
                userId: "U002",
                userName: "Jane Smith",
                issue: "Login issues",
                status: "resolved",
                date: "2023-03-16 09:30 AM",
                description: "I was unable to login yesterday. The issue seems to be resolved now.",
            },
        ];

        // Store default data in localStorage
        localStorage.setItem("users", JSON.stringify(defaultUsers));
        localStorage.setItem("accounts", JSON.stringify(defaultAccounts));
        localStorage.setItem("transactions", JSON.stringify(defaultTransactions));
        localStorage.setItem("tickets", JSON.stringify(defaultTickets));
        localStorage.setItem("initialized", "true");
    }
};

// Authentication functions
export const login = (email: string, password: string): Session | null => {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
        // Update last login
        const updatedUsers = users.map((u) =>
            u.id === user.id ? { ...u, lastLogin: new Date().toLocaleString() } : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Create session
        const session: Session = {
            id: user.id,
            role: user.role,
            email: user.email,
            name: user.name,
        };
        localStorage.setItem("session", JSON.stringify(session));
        return session;
    }

    return null;
};

export const logout = (): void => {
    localStorage.removeItem("session");
};

export const getSession = (): Session | null => {
    const sessionData = localStorage.getItem("session");
    return sessionData ? JSON.parse(sessionData) : null;
};

// User data functions
export const getUserAccounts = (userId: string): Account[] => {
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]") as Account[];
    return accounts.filter((account) => account.userId === userId);
};

export const getUserTransactions = (userId: string): Transaction[] => {
    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]") as Transaction[];
    return transactions.filter((transaction) => transaction.userId === userId);
};

export const getAllUsers = (): User[] => {
    return JSON.parse(localStorage.getItem("users") || "[]") as User[];
};

export const getAllTransactions = (): Transaction[] => {
    return JSON.parse(localStorage.getItem("transactions") || "[]") as Transaction[];
};

export const getAllTickets = (): Ticket[] => {
    return JSON.parse(localStorage.getItem("tickets") || "[]") as Ticket[];
};

// Transaction functions
export const addTransaction = (transaction: Omit<Transaction, "id">): Transaction => {
    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]") as Transaction[];

    // Generate a new transaction ID
    const newId = `TRX${String(transactions.length + 1).padStart(3, "0")}`;

    const newTransaction: Transaction = {
        ...transaction,
        id: newId,
    };

    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Update account balance
    updateAccountBalance(transaction.userId, transaction.type, transaction.amount);

    return newTransaction;
};

// Account functions
export const updateAccountBalance = (
    userId: string,
    transactionType: string,
    amount: number
): void => {
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]") as Account[];

    // Find the user's primary account (checking)
    const accountIndex = accounts.findIndex(
        (acc) => acc.userId === userId && acc.type === "checking"
    );

    if (accountIndex !== -1) {
        // Update balance based on transaction type
        if (transactionType === "deposit") {
            accounts[accountIndex].balance += amount;
        } else if (transactionType === "withdrawal" || transactionType === "transfer") {
            accounts[accountIndex].balance -= amount;
        }

        localStorage.setItem("accounts", JSON.stringify(accounts));
    }
};

// User management functions
export const addUser = (user: Omit<User, "id">): User => {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];

    // Generate a new user ID
    const newId =
        user.role === "admin"
            ? `A${String(users.filter((u) => u.role === "admin").length + 1).padStart(3, "0")}`
            : `U${String(users.filter((u) => u.role === "user").length + 1).padStart(3, "0")}`;

    const newUser: User = {
        ...user,
        id: newId,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    return newUser;
};

export const updateUser = (userId: string, updates: Partial<User>): User | null => {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem("users", JSON.stringify(users));
        return users[userIndex];
    }

    return null;
};

// Ticket functions
export const addTicket = (ticket: Omit<Ticket, "id">): Ticket => {
    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]") as Ticket[];

    // Generate a new ticket ID
    const newId = `TCK${String(tickets.length + 1).padStart(3, "0")}`;

    const newTicket: Ticket = {
        ...ticket,
        id: newId,
    };

    tickets.push(newTicket);
    localStorage.setItem("tickets", JSON.stringify(tickets));

    return newTicket;
};

export const updateTicket = (ticketId: string, updates: Partial<Ticket>): Ticket | null => {
    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]") as Ticket[];
    const ticketIndex = tickets.findIndex((t) => t.id === ticketId);

    if (ticketIndex !== -1) {
        tickets[ticketIndex] = { ...tickets[ticketIndex], ...updates };
        localStorage.setItem("tickets", JSON.stringify(tickets));
        return tickets[ticketIndex];
    }

    return null;
};

// Account functions
export const addAccount = (account: Omit<Account, "id">): Account => {
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]") as Account[];

    // Generate a new account ID
    const newId = `ACC${String(accounts.length + 1).padStart(3, "0")}`;

    const newAccount: Account = {
        ...account,
        id: newId,
    };

    accounts.push(newAccount);
    localStorage.setItem("accounts", JSON.stringify(accounts));

    return newAccount;
};
