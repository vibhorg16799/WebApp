// This file contains all functions called by our site views 

import axios from 'axios'; // imports axios, our http client




// Precondition: newUser object is sent containing: 
// email: varchar
// password: varchar
// address: varchar
// profilePhoto: varchar
// Postconidition: newUser object is sent to /users/register route, which registers a new user in our db 
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

// Precondition: newStudent object is sent containing: 
// userID: int
// pediatricianID: int
// firstName: varchar
// lastName: varchar
// school: varchar
// Postconidition: newStudentobject is sent to /students/register route, which registers a new student in our db 
export const registerStudent = newStudent => {
    return axios
    .post('/students/register', {
    //    userID: newStudent.userID,        OBSOLETE FIELD, NO LONGER CAPTURED
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

// Precondition: newSchool object is sent containing: 
// userID: int
// name: varchar
// phoneNumber: int 
// Postconidition: newSchool object is sent to /schools/register route, which registers a new school in our db 
export const registerSchool = newSchool => {
    return axios 
    .post('/schools/register', {
    //   userID: newSchool.userID,         OBSOLETE FIELD, NO LONGER CAPTURED
        name: newSchool.name,
        phoneNumber: newSchool.phoneNumber
    })
    .then(res => {
        console.log('School Registered')
        //User is registered, if they are a student student will be true
    })
}

// Precondition: newNurse object is sent containing: 
// userID: int
// phoneNumber: varchar
// roomNumber: int 
// Postconidition: newNurse object is sent to /nurses/register route, which registers a new nurse in our db 
export const registerNurse = newNurse => {
    return axios
    .post('/nurses/register', {
    //    userID: newNurse.userID,     OBSOLETE FIELD
        phoneNumber: newNurse.phoneNumber,
        roomNumber: newNurse.roomNumber
    })
    .then(res => {
        console.log('Nurse Registered ' + newNurse.userID)
        //User is registered, if they are a student student will be true
    })
}

// Precondition: newPediatrician object is sent containing: 
// userID: int
// name: varchar
// phoneNumber: varchar
// Postconidition: newPediatrician object is sent to /pediatricians/register route, which registers a new pediatrician in our db 
export const registerPediatrician = newPediatrician => {
    return axios
    .post('/pediatricians/register', {
    //    userID: newPediatrician.userID,    OBSOLETE FIELD 
        name: newPediatrician.name,
        phoneNumber: newPediatrician.phoneNumber
    })
    .then(res => {
        console.log('Pediatrican Registered ' + newPediatrician.name)
        //User is registered, if they are a student student will be true
    })
}

// Precondition: scan object is sent containing: 
// bandID: int
// Postconidition: newScan object is sent to /scans/register route, which registers a new scan in our db 
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

// Precondition: scan object is sent containing: 
// bandID: int
// Postconidition: scan object is sent to /rfids/id route, which returns the userID associated with the bandID sent
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

// Precondition: id is sent containing:
// bandID: int
// Postconidition: email and password associated with userID are sent 
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

// Precondition: user object is sent containing: 
// email: varchar
// password: varchar
// Postconidition: user is logged in 
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

// Precondition: user object is sent containing: 
// email: varchar
// Postconidition: user log in response token is set to local storage 'usertoken' and returned 
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

// Precondition: user object is sent containing: 
// userID: int
// Postconidition: student log in response token is set to local storage 'studentToken' and returned
export const loginStudent = user => {
    return axios 
    .post('students/login', {
        userID: user.userID
    })
    .then(response => {
        localStorage.setItem('studentToken', response.data)
        return response.data
    })
    .catch(err => {
        console.log(err)
    })
}

// Precondition: user object is sent containing: 
// userID: int
// Postconidition: school log in response token is set to local storage 'schoolToken' and returned
export const loginSchool = user => {
    return axios 
    .post('schools/login', {
        userID: user.userID
    })
    .then(response => {
        localStorage.setItem('schoolToken', response.data)
        return response.data
    })
    .catch(err => {
        console.log(err)
    })
}

// Precondition: user object is sent containing: 
// userID: int
// Postconidition: pediatrician log in response token is set to local storage 'pediatricianToken' and returned
export const loginPediatrician = user => {
    return axios 
    .post('pediatricians/login', {
        userID: user.userID
    })
    .then(response => {
        localStorage.setItem('pediatricianToken', response.data)
        return response.data
    })
    .catch(err => {
        console.log(err)
    })
}

// Precondition: user object is sent containing: 
// userID: int
// Postconidition: nurse log in response token is set to local storage 'nurseToken' and returned 
export const loginNurse = user => {
    return axios 
    .post('nurses/login', {
        userID: user.userID
    })
    .then(response => {
        localStorage.setItem('nurseToken', response.data)
        return response.data
    })
    .catch(err => {
        console.log(err)
    })
}

export const isSchool = user => {
    return axios 
    .post('schools/login', {
        userID: user.userID
    })
    .then(response => {
        if(response){
            return true;
        }
        else{
            return false;
        }
    })
    .catch(err => {
        console.log(err)
        return false;
    })
}



/*
//Precondition: 
//Postcondition: 
export const loginUser = user => {
    return axios 
    .post('users/login', {
        email: user.email,
        password: user.password
    })
    .then(response => {
        localStorage.setItem('usertoken', response.data)
        return response.data
    })
    .post('schools/login', {
        userID: response.data.userID
        }
        .then(response => {
            if(response){
                localStorage.setItem('schoolData', response.data)
                .post('nurses/login', {
                    userID:response.data.userID
                })
                .then(response => {
                    localStorage.setItem('nurseData', response.data)
                })
            }
            else{
                console.log(response.data)

                .post('students/login', {
                    userID: response.data.userID
                })
                .then(response => {
                    localStorage.setItem('studentData', response.data)
                })
                .post('pediatricians/login', {
                    userID: response.data.userID
                })
                .then(response => {
                    localStorage.setItem('pediatricianData', response.data)
                })
            }
            
        })
    
    )

    .catch(err => {
        console.log(err)
    })
    
}*/

    

