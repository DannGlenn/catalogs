import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../App";
import devConfig from '../dev.json';
import Loading from "../components/Loading";
import "./CatalogPage.css";
import { Catalog, Vertical } from "../types";
import { Link } from "react-router-dom";

export const CatalogsPage: React.FC = () => {
    const globalData = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(true);
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);
    const [recordsToDelete, setRecordsToDelete] = useState<{ [key: number]: boolean }>({});
    const { API_URL } = devConfig;

    const fetchData = () => {
        fetch(`${API_URL}/catalogs`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((result) => {
            setCatalogs(result.catalogs);
            setRecordsToDelete((result.catalogs).reduce((acc: { [key: number]: boolean }, catalog: Catalog) => {
                acc[catalog.id] = false;
                return acc;
            }, {}));
            setIsLoading(false);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });
    };

    useEffect(() => {      
        fetchData();
    }, []);

    const postDelete = async() =>{
        const response = await fetch(`${API_URL}/catalogs`, {
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(recordsToDelete),
          });
          if (response.ok) {
            fetchData()
          } else {
            throw new Error("Failed to delete catalog");
          }
    }
    

    const getVerticalNameById = (verticalId: number) => {
        const vertical = globalData?.verticals?.find((v: Vertical) => v.id === verticalId);
        return vertical ? vertical.name : 'Unknown';
    };

    const handleCheckboxChange = (id: number) => {
        setRecordsToDelete((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div>
                    <h1>Catalogs</h1>
                    <button><Link to={`edit/0`} className="edit-link">Create</Link></button>
                    <button onClick={postDelete}>Delete selected</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Is Primary</th>
                                <th>Vertical</th>
                                <th>Locale IDs</th>
                                <th>Indexed At</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {catalogs.map((catalog) => (
                                <tr key={catalog.id}>
                                    <td>{catalog.name}</td>
                                    <td>{catalog.is_primary ? 'Yes' : 'No'}</td>
                                    <td>{getVerticalNameById(catalog.vertical_id)}</td>
                                    <td>{JSON.parse(catalog.locale_ids).length ? (JSON.parse(catalog.locale_ids).length > 1 ? 'Multi' : 'Single') : 'N/A'}</td>
                                    <td>{catalog.indexed_at}</td>
                                    <td>
                                        <Link to={`edit/${catalog.id}`} className="edit-link">Edit</Link>
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={recordsToDelete[catalog.id]}
                                            onChange={() => handleCheckboxChange(catalog.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
