import styled from "styled-components"
import homebackground from "../img/homebackground.png"
import { Link } from "react-router-dom"

const Container = styled.div`
width: 100%;
max-width: 393px;
margin: 0 auto;
position: relative;
padding: 150px 0;
display: flex;
justify-content: flex-start;
flex-direction: column;
align-items: center;

img{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
`
const Title = styled.div`
/* margin-top: 100px; */
font-family: 'AHN_L';
color: white;
font-size: 62px;
text-align: center;
margin-bottom: 75px;
`
const Start = styled.div`
font-family: 'AHN_L';
width: 155px;
height: 40px;
background-color: white;
border-radius: 50px;
display: flex;
align-items: center;
justify-content: center;
padding-top: 10px;

a{ 
font-size: 32px;
font-weight: bold;
color: #A8D0E9;
text-decoration: none;
}
`

const Home = () => {
    return(
        <Container>
            <Title>Do you <br/> wanna build<br/> a snowman<br/> with me?</Title>
            <Start>
            <Link to={"/search"}>
            Start
            </Link>
            </Start>
            <img src={homebackground} alt="bg" />
        </Container>
    )
}

export default Home;