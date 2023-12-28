export interface User {
    id: number;
    user_name: string
    first_name: string;
    last_name: string;
    hashpassword: string;
};
export interface UserAuth {
    user_name: string;
    password: string;
};
