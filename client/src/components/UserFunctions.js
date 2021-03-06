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
        console.log("student logged in" + response.data)
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
        console.log("school logged in" + response.data)
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
        console.log("pediatrician logged in " + response.data);
        return response.data;
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
        console.log("nurse logged in " + response.data);
        return response.data;
    })
    .catch(err => {
        console.log(err)
    })
}

// Precondition: user object contains userID value
// Postcondition: returns boolean variable that tells if user is school
// if returns true user is school
// if returns false user is not school
export const isSchool = user => {
    return axios 
    .post('schools/login', {
        userID: user.userID
    })
    .then(response => {
        console.log(response);
        if(response.statusText === "OK"){
            return true;
        }
        else{
            return false;
        }
    })
    .catch(err => {
        console.log(err);
        return false;
    })
}

// Precondition: user object contains userID value
// Postcondition: returns boolean variable that tells if user is school
export const registerEmergencyContact = user => {
    return axios 
    .post('/emergencyinfos/register', {
        emergencyContact1: user.emergencyContact1,
        emergencyContact2: user.emergencyContact2,
    })
    .then(response => {
        console.log(response.data);

    })
}

// Precondition: user object contains userID value
// Postcondition: returns boolean variable that tells if user is school
export const registerBloodChart = user => {
    return axios 
    .post('/bloodcharts/register', {
        bloodType: user.bloodType,
    })
    .then(response => {
        console.log(response.data);

    })
}

// Precondition: user object contains userID value
// Postcondition: returns boolean variable that tells if user is school
export const registerNearestER = user => {
    return axios 
    .post('/nearesters/register', {
        address: user.address,
        phoneNumber: user.phoneNumber,
    })
    .then(response => {
        console.log(response.data);

    })
}

// Precondition: user object contains userID value
// Postcondition: returns boolean variable that tells if user is school
export const registerMedicalCondition = user => {
    return axios 
    .post('/medicalconditions/register', {
        bandID: user.bandID,
        conditionID: user.conditionID,
    })
    .then(response => {
        console.log(response.data);

    })
}

// Precondition: user object contains userID value
// Postcondition: returns boolean variable that tells if user is school
export const registerConditionName = user => {
    return axios 
    .post('/conditionnames/register', {
        conditionID: user.conditionID,
        conditionName: user.conditionName,
    })
    .then(response => {
        console.log(response.data);
    })
}

// Precondition: user object contains userID value
// Postcondition: returns boolean variable that tells if user is school
export const registerContagiousDisease = user => {
    return axios 
    .post('/contagiousdiseases/register', {
        bandID: user.bandID,
        diseaseID: user.diseaseID,
    })
    .then(response => {
        console.log(response.data);
    })
}

// Precondition: user object contains userID value
// Postcondition: returns boolean variable that tells if user is school
export const registerDiseaseName = user => {
    return axios 
    .post('/diseasenames/register', {
        diseaseID: user.diseaseID,
        diseaseName: user.diseaseName,
    })
    .then(response => {
        console.log(response.data);
    })
}

// Precondition: user object contains userID value
// Postcondition: returns boolean variable that tells if user is school
export const registerAllergy = user => {
    return axios 
    .post('/allergys/register', {
        bandID: user.bandID,
        allergyID: user.allergyID,
    })
    .then(response => {
        console.log(response.data);
    })
}

// Precondition: user object contains userID value
// Postcondition: returns boolean variable that tells if user is school
export const registerAllergyName = user => {
    return axios 
    .post('/allergynames/register', {
        allergyID: user.allergyID,
        allergyName: user.allergyName,
    })
    .then(response => {
        console.log(response.data);
    })
}

// Precondition: user object contains userID value
// Postcondition: returns boolean variable that tells if user is school
export const registerRFID = bandID => {
    return axios 
    .post('/rfids/register', {
        bandID: bandID.bandID,
    })
    .then(response => {
        console.log(response.data);
    })
}


// Precondition: user object contains bandID value
// Postcondition: returns list of RFID codes associated to userID
export const loginRFID = user => {
    return axios 
    .post('/rfids/bands', {
        userID: user.userID,
    })
    .then(response => {
        localStorage.setItem('rfidToken', JSON.stringify(response.data));
        console.log("RFID's logged in " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })
    .catch(err => {
        console.log(err);
    })
}

// Precondition: user object contains bandID value
// Postcondition: returns boolean variable that tells if user is school
export const loginEmergencyInfo = user => {
    return axios 
    .post('/emergencyinfos/login', {
        userID: user.userID,
    })
    .then(response => {
        localStorage.setItem('emergencyToken', response.data)
        console.log("Emergency Info logged in " + response.data);
        return response.data;
    })
}

// Precondition: user object contains bandID value
// Postcondition: returns boolean variable that tells if user is school
export const loginBloodChart = user => {
    return axios 
    .post('/bloodcharts/login', {
        userID: user.userID,
    })
    .then(response => {
        localStorage.setItem('bloodToken', response.data)
        console.log("Blood Chart logged in " + response.data);
        return response.data;
    })
}

// Precondition: user object contains bandID value
// Postcondition: returns boolean variable that tells if user is school
export const loginMedicalCondition = band => {
    return axios 
    .post('/medicalconditions/list', {
        bandID: band.bandID,
    })
    .then(response => {
        localStorage.setItem('conditionToken', JSON.stringify(response.data))
        console.log("Medical Condition logged in " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })
}

// Precondition: user object contains bandID value
// Postcondition: returns boolean variable that tells if user is school
export const loginContagiousDisease = band => {
    return axios 
    .post('/contagiousdiseases/list', {
        bandID: band.bandID,
    })
    .then(response => {
        localStorage.setItem('diseaseToken', JSON.stringify(response.data))
        console.log("Contagious Disease logged in " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })
}

// Precondition: user object contains bandID value
// Postcondition: returns boolean variable that tells if user is school
export const loginAllergen = band => {
    return axios 
    .post('/allergys/list', {
        bandID: band.bandID,
    })
    .then(response => {
        localStorage.setItem('allergyToken', JSON.stringify(response.data))
        console.log("Allergy logged in " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })
}

// Precondition: user object contains bandID value
// Postcondition: returns boolean variable that tells if user is school
export const allergenName = allergen => {
    return axios 
    .post('/allergynames/login', {
        allergyID: allergen[0].allergyID,
    })
    .then(response => {
        localStorage.setItem('allergyNameToken', response.data)
        console.log("Allergy Name logged in " + (response.data));
        return (response.data);
    })
}

// Precondition: user object contains bandID value
// Postcondition: returns boolean variable that tells if user is school
export const diseaseName = disease => {
    return axios 
    .post('/diseasenames/login', {
        diseaseID: disease.diseaseID,
    })
    .then(response => {
        localStorage.setItem('diseaseNameToken', response.data)
        console.log("Disease Name logged in " + response.data);
        return response.data;
    })
}

// Precondition: user object contains bandID value
// Postcondition: returns boolean variable that tells if user is school
export const conditionName = condition => {
    return axios 
    .post('/conditionnames/login', {
        conditionID: condition.conditionID,
    })
    .then(response => {
        localStorage.setItem('conditionNameToken', response.data)
        console.log("Condition Name logged in " + response.data);
        return response.data;
    })
}

// Precondition: user object contains bandID value
// Postcondition: returns boolean variable that tells if user is school
export const allergyList = allergy => {
    if(allergy.allergyID4 !== undefined){
    return axios
    
    .post('/allergynames/list', {
        allergyID1: allergy.allergyID1.allergyID,
        allergyID2: allergy.allergyID2.allergyID, 
        allergyID3: allergy.allergyID3.allergyID, 
        allergyID4: allergy.allergyID4.allergyID
    })
    .then(response => {
        localStorage.setItem('allergyNameList', JSON.stringify(response.data))
        console.log("Allergy Name List Logged In " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })
}else if(allergy.allergyID3 !== undefined){
    return axios
    
    .post('/allergynames/list', {
        allergyID1: allergy.allergyID1.allergyID,
        allergyID2: allergy.allergyID2.allergyID, 
        allergyID3: allergy.allergyID3.allergyID, 
    })
    .then(response => {
        localStorage.setItem('allergyNameList', JSON.stringify(response.data))
        console.log("Allergy Name List Logged In " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })

}else if(allergy.allergyID2 !== undefined){
    return axios
    
    .post('/allergynames/list', {
        allergyID1: allergy.allergyID1.allergyID,
        allergyID2: allergy.allergyID2.allergyID, 
    })
    .then(response => {
        localStorage.setItem('allergyNameList', JSON.stringify(response.data))
        console.log("Allergy Name List Logged In " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })
}else if(allergy.allergyID1 !== undefined){
    return axios
    
    .post('/allergynames/list', {
        allergyID1: allergy.allergyID1.allergyID,
    })
    .then(response => {
        localStorage.setItem('allergyNameList', JSON.stringify(response.data))
        console.log("Allergy Name List Logged In " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })

}else{
    return axios
    
    .post('/allergynames/list', {
        allergyID1: ' ',
    })
    .then(response => {
        localStorage.setItem('allergyNameList', JSON.stringify(response.data))
        console.log("Allergy Name List Logged In " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })
}
}

// Precondition: user object contains bandID value
// Postcondition: returns boolean variable that tells if user is school
export const conditionList = condition => {
    if(condition.conditionID4 !== undefined){
    return axios
    
    .post('/conditionnames/list', {
        conditionID1: condition.conditionID1.conditionID,
        conditionID2: condition.conditionID2.conditionID, 
        conditionID3: condition.conditionID3.conditionID, 
        conditionID4: condition.conditionID4.conditionID
    })
    .then(response => {
        localStorage.setItem('conditionNameList', JSON.stringify(response.data))
        console.log("Condition Name List Logged In " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })
}else if(condition.conditionID3 !== undefined){
    return axios
    
    .post('/conditionnames/list', {
        conditionID1: condition.conditionID1.conditionID,
        conditionID2: condition.conditionID2.conditionID, 
        conditionID3: condition.conditionID3.conditionID,
    })
    .then(response => {
        localStorage.setItem('conditionNameList', JSON.stringify(response.data))
        console.log("Condition Name List Logged In " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })

}else if(condition.conditionID2 !== undefined){
    return axios
    
    .post('/conditionnames/list', {
        conditionID1: condition.conditionID1.conditionID,
        conditionID2: condition.conditionID2.conditionID, 
    })
    .then(response => {
        localStorage.setItem('conditionNameList', JSON.stringify(response.data))
        console.log("Condition Name List Logged In " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })
}else if(condition.conditionID1 !== undefined){
    return axios
    
    .post('/conditionnames/list', {
        conditionID1: condition.conditionID1.conditionID,
    })
    .then(response => {
        localStorage.setItem('conditionNameList', JSON.stringify(response.data))
        console.log("Condition Name List Logged In " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })

}
else{
    return axios
    
    .post('/conditionnames/list', {
        conditionID1: ' ',
    })
    .then(response => {
        localStorage.setItem('conditionNameList', JSON.stringify(response.data))
        console.log("Condition Name List Logged In " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })

}
}

// Precondition: user object contains bandID value
// Postcondition: returns boolean variable that tells if user is school
export const diseaseList = disease => {
    if(disease.diseaseID4 !== undefined){
    return axios
    
    .post('/diseasenames/list', {
        diseaseID1: disease.diseaseID1.diseaseID,
        diseaseID2: disease.diseaseID2.diseaseID, 
        diseaseID3: disease.diseaseID3.diseaseID, 
        diseaseID4: disease.diseaseID4.diseaseID
    })
    .then(response => {
        localStorage.setItem('diseaseNameList', JSON.stringify(response.data))
        console.log("Disease Name List Logged In " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })
}else if(disease.diseaseID3 !== undefined){
    return axios
    
    .post('/diseasenames/list', {
        diseaseID1: disease.diseaseID1.diseaseID,
        diseaseID2: disease.diseaseID2.diseaseID, 
        diseaseID3: disease.diseaseID3.diseaseID,
    })
    .then(response => {
        localStorage.setItem('diseaseNameList', JSON.stringify(response.data))
        console.log("Disease Name List Logged In " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })

}else if(disease.diseaseID2 !== undefined){
    return axios
    
    .post('/diseasenames/list', {
        diseaseID1: disease.diseaseID1.diseaseID,
        diseaseID2: disease.diseaseID2.diseaseID, 
    })
    .then(response => {
        localStorage.setItem('diseaseNameList', JSON.stringify(response.data))
        console.log("Disease Name List Logged In " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })
}else if(disease.diseaseID1 !== undefined){
    return axios
    
    .post('/diseasenames/list', {
        diseaseID1: disease.diseaseID1.diseaseID,
    })
    .then(response => {
        localStorage.setItem('diseaseNameList', JSON.stringify(response.data))
        console.log("Disease Name List Logged In " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })

}else{
    return axios
    
    .post('/diseasenames/list', {
        diseaseID1: ' ',
    })
    .then(response => {
        localStorage.setItem('diseaseNameList', JSON.stringify(response.data))
        console.log("Disease Name List Logged In " + JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })


}
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

    

