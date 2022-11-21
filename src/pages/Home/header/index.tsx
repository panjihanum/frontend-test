import styled from "styled-components";
import IMAGES from "../../../assets/images";
import SVGS from "../../../assets/svgs";

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 75px;
    align-items: center;
`

const ButtonShopping = styled.a`
    padding: 20px;
    background-color: white;
    border-radius: 20px;
    cursor: pointer;
    &:hover {
        transform: scale(0.95); 
    }
`

interface IHeader {
    openShopping: () => void;
}
const Header = ({ openShopping }: IHeader) => {

    return (
        <Wrapper>
            <div></div>
            <img src={IMAGES.StarWars} width={200} height={200} alt="Star Wars"></img>
            <ButtonShopping onClick={openShopping}>
                <img src={SVGS.shopping} width={25} height={25} alt="shopping" />
            </ButtonShopping>
        </Wrapper>
    )
}

export default Header;