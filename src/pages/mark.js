import "../style/page/mark.css";
import img from "../pictures/shiori6Circle.jpg"; // Replace with actual image URLs

const members = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: `成员 ${i + 1}`,
    photo: img, // Placeholder image, replace with actual URLs
    leftBarPercentage: Math.floor(Math.random() * 100), // Random percentage for demo
    rightBarPercentage: Math.floor(Math.random() * 100), // Random percentage for demo
}));

const Mark = function () {
    return (
        <div>
            This is Mark
            {members.map((member) => (
                <div key={member.id} className="mark-member-container">
                    <div className="mark-bar-container-left">
                        <div
                            className="mark-bar-filled-left"
                            style={{ width: `${member.leftBarPercentage}%` }}
                        ></div>
                    </div>

                    <div className="mark-bar-percentage" style={{ marginRight: "3%" }}>
                        {member.leftBarPercentage}%
                    </div>

                    <div className="mark-image-container">
                        <img
                            src={member.photo}
                            alt={member.name}
                            className="mark-component-image"
                        />
                        <p>{member.name}</p>
                    </div>

                    <div className="mark-bar-percentage" style={{ marginLeft: "3%" }}>
                        {member.rightBarPercentage}%
                    </div>

                    <div className="mark-bar-container-right">
                        <div
                            className="mark-bar-filled-right"
                            style={{ width: `${member.rightBarPercentage}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Mark;
