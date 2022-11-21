import { useEffect, useRef, useState } from "react";
import { planetService } from "../../services";
import { PlanetAttributes, PlanetResponse } from "../../types/planet.type";
import Header from "./header"
import _ from 'lodash';
import Atoms from "../../components/atoms";
import styled from "styled-components";
import Modal from "../../components/atoms/Modal";
import H1 from "../../components/atoms/H1";
import H5 from "../../components/atoms/H5";

const Wrapper = styled.div`
    flex: 1;
    flex-direction: row;
    padding: 50px;
`;

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 1rem;
    @media (max-width: 992px) {
        grid-auto-flow: row;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
`

const HeaderBox = styled.div`
    padding-bottom: 20px;
    border-bottom: 2px solid black;
    margin-bottom: 40px;
`

const Button = styled.a`
    cursor: pointer;
    &:hover {
        transform: scale(0.95); 
    }
    display: flex;
`

const TextWrapper = styled.div`
    display: flex;
    flex-direction: rows;
    justify-content: between;

    > * {
        &:first-child {
        width: 200px;
        }
    }
`
const Home = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [singlePlanet, setSinglePlanet] = useState<PlanetAttributes | null>(null);
    const [planet, setPlanet] = useState<PlanetAttributes[] | []>([]);
    const [planetCurrent, setPlanetCurrent] = useState<PlanetResponse | undefined>(undefined);
    const wrapperRef = useRef<HTMLInputElement | null>(null);
    const [initial, setInitial] = useState<boolean>(false);
    const [open, setIsOpen] = useState<boolean>(false);
    const [openShopping, setIsOpenShopping] = useState<boolean>(false);
    const [shoppingPlanet, setShoppingPlanet] = useState<PlanetAttributes[] | []>([]);

    window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 45) {
            loadPlanet();
        }
    }

    useEffect(() => {
        if (initial && wrapperRef?.current?.clientHeight && wrapperRef?.current?.clientHeight < window.innerHeight) {
            loadPlanet();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wrapperRef?.current?.clientHeight]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const result: PlanetResponse | undefined = await planetService.getAll();
            result !== undefined && setPlanet(_.compact(result.results || []));
            setPlanetCurrent(result);
            setLoading(false);
            setInitial(true);
        }
        fetchData();
    }, []);

    const loadPlanet = async () => {
        if (!loading && planetCurrent?.next) {
            setLoading(true);

            const result: PlanetResponse | undefined = await planetService.getAllByUrl(planetCurrent.next);
            result !== undefined && setPlanet(_.concat(planet, result.results || []));
            setPlanetCurrent(result);
            setLoading(false);
        }
    }

    const handleOpen = async (data: PlanetAttributes) => {
        const getSinglePlanet: PlanetAttributes | undefined = await planetService.getSingleByUrl(data.url);
        setSinglePlanet(getSinglePlanet || null);
        setIsOpen(true);
    }

    const addDataShopping = (data: PlanetAttributes) => {
        setShoppingPlanet(_.concat(shoppingPlanet, data));
    }

    return (
        <Wrapper ref={wrapperRef}>
            <Header openShopping={() => {
                document.body.style.overflow = "hidden";
                setIsOpenShopping(true)
            }} />
            <GridWrapper>
                {_.map(planet, (data: PlanetAttributes) => (
                    <Button onClick={() => handleOpen(data)}>
                        <Atoms.Box data={data} addDataShopping={addDataShopping} />
                    </Button>
                ))}
            </GridWrapper>
            {loading ? <div className="mt-10 text-center">loading data ...</div> : ""}

            {openShopping && <Modal setIsOpen={() => {
                document.body.style.overflow = "auto"
                setIsOpenShopping(false)
            }}>
                {_.map(shoppingPlanet, data => (
                    <Atoms.Box data={data} />
                ))}
            </Modal>}

            {open && <Modal setIsOpen={setIsOpen}>
                <HeaderBox><H1>{singlePlanet?.name}</H1></HeaderBox>
                <TextWrapper>
                    <H5>Climate</H5>
                    <H5>: {singlePlanet?.climate}</H5>
                </TextWrapper>
                <TextWrapper>
                    <H5>Diameter</H5>
                    <H5>: {singlePlanet?.diameter}</H5>
                </TextWrapper>
                <TextWrapper>
                    <H5>Orbital Period</H5>
                    <H5>: {singlePlanet?.orbital_period}</H5>
                </TextWrapper>
                <TextWrapper>
                    <H5>Rotation Period</H5>
                    <H5>: {singlePlanet?.rotation_period}</H5>
                </TextWrapper>
                <TextWrapper>
                    <H5>Gravity</H5>
                    <H5>: {singlePlanet?.gravity}</H5>
                </TextWrapper>
                <TextWrapper>
                    <H5>Terrain</H5>
                    <H5>: {singlePlanet?.terrain}</H5>
                </TextWrapper>
                <TextWrapper>
                    <H5>Surface Water</H5>
                    <H5>: {singlePlanet?.surface_water}</H5>
                </TextWrapper>
                <TextWrapper>
                    <H5>Population</H5>
                    <H5>: {singlePlanet?.population}</H5>
                </TextWrapper>
            </Modal>}

        </Wrapper>
    )
}

export default Home;