import React, {useEffect, useState} from "react";


const App= ({...props}) => {
    
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        dob: '',
    })

    const {firstName, lastName, dob} = state;

    const changeHandler = name => event => {
        setState(pre => {
            return {...pre, [name]:event.target.value};
        })
    }
    

    const onFormSubmit = event => {
        event.preventDefault();
        console.log(state);
        setState({
            firstName: '',
            lastName: '',
            dob: '',
        })
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                First Name : <input type="text" value={firstName} placeholder="Enter first name" onChange={changeHandler("firstName")}/><br/>
                Last Name : <input type="text" value={lastName} placeholder="Enter last name" onChange={changeHandler("lastName")}/><br/>
                Dob : <input type="date" value={dob} onChange={changeHandler("dob")}/>
                <button>Submit</button>
            </form>
        </div>
    )

}

export default App;