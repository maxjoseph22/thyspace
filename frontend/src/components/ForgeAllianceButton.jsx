import { forgeAlliance } from "../services/alliances"


const ForgeAllianceButton = (props) => {
    const { _id } = props
    console.log(_id)
    const handleClick = async () => {
        try {
            const token = localStorage.getItem("token");
            if(!token) {
                throw new Error("No token found")
            }
            console.log(token)
            const response = await forgeAlliance(token, _id)
            console.log("Alliance Forged", response);
        } catch (error) {
            console.error("Error forging alliance:", error)
        }
    }
    return (
        <button onClick={handleClick}>Complete the forging of this alliance?</button>
    );
};

export default ForgeAllianceButton