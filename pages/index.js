import Request from "../util/request";
import Nav from "../components/Nav";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/index.module.css";
import Chart from "../components/Chart";

export default function Home(props) {
  const { list } = props;
  const propertyId = useRef();
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState({ income: [], expense: [] });

  const changeProperty = async (e) => {
    try {
      const { data } = await Request.get(
        `/api/properties/${propertyId.current.value}`
      );

      if (data) {
        setProperty(data);
      }
    } catch (error) {
      console.error(error.mesage);
    }
  };

  useEffect(() => {
    setProperties(list);
  }, []);

  useEffect(() => {
    const selectProperty = document.getElementById("selectProperty");

    selectProperty.addEventListener("change", changeProperty);

    return () => {
      selectProperty.removeEventListener("change", changeProperty);
    };
  }, []);

  return (
    <>
      <div className={styles.graphContainer}>
        <Nav />
        <div className="flex justify-center mt-8 mb-5">
          <select
            ref={propertyId}
            id="selectProperty"
            className="rounded p-5 border-2 border-zinc-700"
          >
            <option value="0"> Select Property</option>
            {properties.length &&
              properties.map((item) => (
                <option value={item.propertyId} key={item.propertyId}>
                  {" "}
                  {item.propertyName}
                </option>
              ))}
          </select>
        </div>

        <Chart property={property}></Chart>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    const cookie = req.headers.cookie;
    const options = {
      headers: {
        cookie,
      },
    };
    const { data, status } = await Request.get("/api/properties", options);

    if (status === 400) {
      throw new Error();
    }

    return {
      props: { list: data },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/signin",
        statusCode: 302,
      },
    };
  }
}
