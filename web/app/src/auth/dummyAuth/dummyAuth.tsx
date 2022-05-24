import dummyData from "../../data/dummy/DummyDB"

// get dummy database/dataset
const data = dummyData;


/*
** dummyAuth Object. Allows other components to call the login method to authenticate user from the Dummy Database
*/
const dummyAuth = {


    /*
     * login(): Allows to login as a user from the dummy database. 
     * @param email: email that a user would use to login
     * @param password: the user's password
     * @returns the user object from the dummy database if successfully authenticated, otherwise returns null
     */
    login: (email: string, password: string) => {
        const user = data.users.find(user => user.email === email && user.password === password);
        if (user) {
            return user;
        } else {
            return null;
        }
    }


}

export default dummyAuth;
