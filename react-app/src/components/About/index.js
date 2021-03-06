import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./About.css"

function About() {

    return (
        <div className="about-body">
            <h1 className="about-header">Don't Forget The Gas</h1>
            <div classname="p-container">
                <p>Don't Forget The Gas is a "Remember The Milk" clone. Here the user can create, edit or delete lists, items on lists, and list categories all from the 'lists' tab. If you're looking for more than just a list, stay tuned as we bring Trip planning to DFTG in the not too distant future. The new update will allow users to plan a trip, add stops and trip companions and even share your trip with other uses across social networks! DFTG has much more in store so don't forget to come back, and on your way home, don't forget the gas.</p>
                <h3>The Developer</h3>
                <p>James Daniel began developing web applications in early 2021. James has exposure to Express, Node, React, Redux, Python, and Javascript among a few others. James spends his free time practicing Leetcodes and working past and future projects, and when James isn't coding he's riding BMX. If you like what you see and want to work with James, you can check him out on GitHub by clicking the image below.
                </p>
            </div>
            <div className="social-media-links">
                {/* <div className="social-media" onClick={() => window.open("")}>
                    <img className="media-image " src="" style={{ height: "100px" }} />
                </div> */}
                <div className="social-media">
                    <img className="github media-image" src='https://image.flaticon.com/icons/png/512/25/25231.png' style={{ height: "100px" }} onClick={() => window.open("https://github.com/jdaniel01")} />
                </div>
                <div className="social-media" onClick={() => window.open("https://www.linkedin.com/in/james-daniel-jr-403178189?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BVwQ9TThBT6OMT41JzUhOAw%3D%3D")}>
                    <img className="media-image linked-in" src="https://image.flaticon.com/icons/png/512/174/174857.png" style={{ height: "100px" }} />
                </div>
            </div>

        </div>
    )
}

export default About;