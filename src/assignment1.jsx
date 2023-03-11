import { useState } from "react";

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

    const submitFinalForm = () => {
        const formValue = {
            name,
            age: 18,
            gender: 'X',
            nationality: 'in',
            married: true,
            hasSiblings: true,
            hasChildren: false
        };
        console.log("form submit", formValue);
        alert(JSON.stringify(formValue));
    };

    return <div>
        <input value={name} onChange={e => setName(e.target.value)} />
        <button onClick={submitFinalForm}>Submit!</button>
    </div>;
}
