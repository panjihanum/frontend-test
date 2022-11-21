import styled from "styled-components";
import SVGS from "../../../assets/svgs";
import H1 from "../H1";
import H5 from "../H5";
import { BoxAttributes } from "./index.type";

const Wrapper = styled.a`
    width: 100%;
    min-height: 150px;
    background-color: #00000080;
    padding: 30px;
    border-radius: 20px;
    position: relative;
`

const HeaderBox = styled.div`
    padding-bottom: 20px;
    border-bottom: 2px solid white;
    margin-bottom: 40px;
    justify-content: space-between;
    display: flex;
    flex: rows;
`

const ShoppingButton = styled.a`
    padding: 20px;
    background-color: #FFFFFF;
    border-radius: 20px;
    position: absolute;
    top: 25px;
    right: 30px;
    z-index: 9;
`
const Box = (props: BoxAttributes) => {
    const { data, addDataShopping } = props;
    return (
        <Wrapper>
            <HeaderBox>
                <H1>{data.name}</H1>
                {addDataShopping && (
                    <ShoppingButton onClick={(event) => {
                        event.stopPropagation();
                        addDataShopping && addDataShopping(data);
                    }}>
                        <img src={SVGS.shopping} alt="shopping" width={20} height={20} />
                    </ShoppingButton>
                )}

            </HeaderBox>
            <H5>Climate&emsp;&emsp;: {data.climate}</H5>
            <H5>Diameter&emsp;&nbsp;: {data.diameter}</H5>
        </Wrapper>
    )
}

export default Box;