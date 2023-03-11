import { useState } from "react";
import Select from "react-select";


/*
  Assignment 1: basic form elements
  Currently the form only has an input field linked to the state `name`
  Make changes to add:
  1) Text box for `age`. Should validate that it's a number, else make the input as error
  2) Radio menu for `gender`. Should have 2 or 3 options. Exactly 1 should be selected. 
  3) Select dropdown for `nationality`. Have 4-5 options. User can select 1 or none
  4) Checkbox for `isMarried`, `hasSiblings`, `hasChildren`

  Now some more advanced stuff. Use `npm` to install component library of your choice(eg. antd, mui):
  5) Multi select dropdown to select know `languages`
  6) Date input (select from calendar) to select `dob`(date of birth)
  7) Slider to increase/decrease font size. This should not be submitted in the form, but should control the font size of all elements of it.
 */

export const Assignment1 = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [nationality, setNationality] = useState("");
    const [isMarried, setIsMarried] = useState("");
    const [hasChildren, setHasChildren] = useState("");
    const [hasSiblings, setHasSiblings] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);


    const submitFinalForm = () => {
        if (isNaN(age)) {
            alert("Age is Invalid");
            return;
        }
        function languagesKnown() {
            var languages = "";
            selectedOptions.forEach(l =>
                languages = languages === "" ? l.value : languages + ',' + l.value);
            return languages;
        }
         const formValue = {
            name,
            age,
            gender,
            nationality,
            "isMarried" : isMarried === true ? true : false,
            "hasChildren" : hasChildren === true ? true : false,
            "hasSiblings" : hasSiblings === true ? true : false,
            "languagesKnown" : languagesKnown(),
        };
        console.log("form submit", formValue);
        alert(JSON.stringify(formValue));
    };

    function handleGenderChange(event) {
        setGender(event.target.value);
    };

    const options = [
        { value: "Spanish", label: "Spanish" },
        { value: "French", label: "French" },
        { value: "English", label: "English" },
        { value: "Hindi", label: "Hindi" }
      ];

    return <div>
        <div> Name: <input value={name} onChange={e => setName(e.target.value)} /></div>
        <div> Age:  <input value={age} onChange = {e => setAge(e.target.value)} /></div>
        <div>
            Gender : <br/>
          <input type="radio" name="gender" value="male"  onChange={e => handleGenderChange(e)}/>
          <label >Male</label> <br/>
          <input type="radio" name="gender" value="female" onChange={e => handleGenderChange(e)}/>
          <label > Female</label> <br/>
        </div>
        <div>
            Nationality :
            <select value = {nationality} onChange = {e => setNationality(e.target.value) }>
                <option value=""></option>
                <option value="India">India</option>
                <option value="Aus">Aus</option>
                <option value="UK">UK</option>
                <option value="USA">USA</option>
            </select>
        </div>
        <div> isMarried : <input type="checkbox" checked={isMarried} onChange={e => setIsMarried(e.target.checked)} /></div>
        <div> hasChildren : <input type="checkbox" checked={hasChildren} onChange={e => setHasChildren(e.target.checked)} /></div>
        <div> hasSiblings : <input type="checkbox" checked={hasSiblings} onChange={e => setHasSiblings(e.target.checked)} /></div>
        <div> Languages : <Select isMulti options={options} value={selectedOptions} onChange={e => setSelectedOptions(e)}/></div>
        <button onClick={submitFinalForm}>Submit!</button>
    </div>;
}
