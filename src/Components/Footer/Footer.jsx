import './style.css';
import { BsLinkedin, BsGithub, BsMailbox2, BsFillCreditCard2FrontFill } from "react-icons/bs";


export default function Footer(){
    const style1 = {color: "#c1440e", fontSize: "1.8rem", verticalAlign: "text-bottom", marginRight: '2px'}

    return (
        <div className="footer-container">
            <div className="footer-content-container">
                <div className="footer-about">
                    <h2 className="footer-title">About</h2>
                    <h2 className="footer-about-content"> 
                        This web app was created out of curiosity & interest in space exploration. This app is intended to be used for reasearch, analysis, for exploration purposes or just 
                        for quenching your curiosity. Feel free to reach out to me for any feedback or questions regarding this app.
                    </h2>
                </div>
                <div className="footer-contact">
                <h2 className="footer-title">Contact</h2>
                    <div className="footer-contact-content"> 
                        <h2 className="footer-contact-name">Abdul Mannan</h2>
                        <p className="footer-contact-bio">A Computer Science & Statistics Student at University of Toronto</p>
                        <div className="footer-contact-links">
                            <a href="https://github.com/dyerfire9/" target="_blank" className="footer-links"><BsMailbox2 style={style1}/>Email</a>
                            <a href="https://github.com/dyerfire9/" target="_blank" className="footer-links"><BsGithub style={style1}/>Github</a>
                            <a href="https://linkedin.com/in/abdulmannancomp/" target="_blank" className="footer-links"><BsLinkedin style={style1}/>LinkedIn</a>
                            <a href="https://dyerfire9.github.io/portfolio-site/" target="_blank" className="footer-links"><BsFillCreditCard2FrontFill style={style1}/>Website</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}