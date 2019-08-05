import axios from 'axios';




//New base class user function
export const register = newUser => {
 //   if(newUser.userType === 'student')
    return axios 
    .post('users/register', {
        email: newUser.email,
        password: newUser.password,
        address: newUser.address,
        profilePhoto: newUser.profilePhoto,
    })
/*    .post('students/register', {
        userID: newUser.userID,
        pediatricianID: newUser.pediatricianID,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        school: newUser.school
    })*/
    .then(res => {
        console.log('User Registered')
        //User is registered, if they are a student student will be true
    })

    

  /*  else {
    return axios 
    .post('schools/register', {
        userID: newUser.userID,
        name: newUser.name,
        phoneNumber: newUser.phoneNumber
    }) */
}

//Student Sign Up Function
export const registerStudent = newStudent => {
    return axios
    .post('/students/register', {
        userID: newStudent.userID,
        pediatricianID: newStudent.pediatricianID,
        firstName: newStudent.firstName,
        lastName: newStudent.lastName,
        school: newStudent.school,
        
    })
    .then(res => {
        console.log('Student Registered ' + newStudent.userID)
        //User is registered, if they are a student student will be true
    })
}

//School Sign Up Function
export const registerSchool = newSchool => {
    return axios 
    .post('/schools/register', {
        userID: newSchool.userID,
        name: newSchool.name,
        phoneNumber: newSchool.phoneNumber
    })
    .then(res => {
        console.log('School Registered')
        //User is registered, if they are a student student will be true
    })
}

export const registerNurse = newNurse => {
    return axios
    .post('/nurses/register', {
        userID: newNurse.userID,
        phoneNumber: newNurse.phoneNumber,
        roomNumber: newNurse.roomNumber
    })
    .then(res => {
        console.log('Nurse Registered ' + newNurse.userID)
        //User is registered, if they are a student student will be true
    })
}

export const registerPediatrician = newPediatrician => {
    return axios
    .post('/pediatricians/register', {
        userID: newPediatrician.userID,
        name: newPediatrician.name,
        phoneNumber: newPediatrician.phoneNumber
    })
    .then(res => {
        console.log('Pediatrican Registered ' + newPediatrician.name)
        //User is registered, if they are a student student will be true
    })
}

/*School update function 
export const updateSchool = newSchool => {
    return axios
    .put('/schools/register?userID=97', {
        name: newSchool.name,
        phoneNumber: newSchool.phoneNumber
    })
}*/
export const registerScan = scan => {
    return axios
    .post('/scans/register', {
        bandID: scan.bandID,
    })
    .then(res => {
        console.log(res.data)
        //User is registered, if they are a student student will be true
    })
}


export const getUserID = scan => {
    return axios
    .post('/rfids/id', {
        bandID: scan.bandID
    })
    .then(res => {
        localStorage.setItem('userID', res.data)
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}


export const getLogInInfo = id => {
    return axios
    .post('/users/logininfo', {
        userID: id,
    })
    .then(res => {
        const user= {
            email: res.data.email,
            password: res.data.password
        };
        return user;
        //User is registered, if they are a student student will be true
    })
    .catch(err => {
        console.log(err)
    })
}

//Log in function
export const login = user => {
    return axios 
    .post('users/login', {
        email: user.email,
        password: user.password
    })
    .then(response => {
        localStorage.setItem('usertoken', response.data)
        return response.data
    })
    .catch(err => {
        console.log(err)
    })
}

//Log in scanned user function
export const loginScan = user => {
    return axios 
    .post('users/loginscan', {
        email: user.email,
     //   password: user.password
    })
    .then(response => {
        localStorage.setItem('usertoken', response.data)
        return response.data
    })
    .catch(err => {
        console.log(err)
    })
}



    

