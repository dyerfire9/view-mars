import React from "react";

export default function HelpModal(){
    let [helpModal, setHelpModal] = React.useState(true)
    return(
        <div className="help-modal">
            <div className="help-modal-container">
                Hello
            </div>
        <HelpModal state={helpModal} setState={setHelpModal}/>
        </div>
    )
}