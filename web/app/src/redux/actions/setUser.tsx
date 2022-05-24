// Set User action for UserReducer
export default function setUser(user: any) {
    return {
        type: 'SET_USER',
        user,
    };
}