export interface User extends UserProfile {
    $id: string
}

export interface UserProfile {
    name: string
    email: string
    avatar?: string
    $id: string
}