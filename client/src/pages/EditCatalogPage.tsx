import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";
import { Vertical, Locale } from "../types";
import devConfig from "../dev.json";
import Loading from "../components/Loading";
import "./EditCatalogPage.css";

export const EditCatalogPage: React.FC = () => {
  const { catalogId } = useParams<{ catalogId: string }>();
  const globalData = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);
  const [verticalId, setVerticalId] = useState<number | "">("");
  const [localeIds, setLocaleIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const catalogIdAsNumber = Number(catalogId)
  const { API_URL } = devConfig;

  useEffect(() => {
    
    const fetchCatalog = async () => {
      try {
        const response = await fetch(`${API_URL}/catalogs/${catalogId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const catalogData = result.catalog;
        setName(catalogData.name);
        setIsPrimary(catalogData.is_primary);
        setVerticalId(catalogData.vertical_id);
        setLocaleIds(JSON.parse(catalogData.locale_ids).map(String));
        setIsLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    if(catalogIdAsNumber){
      fetchCatalog();
    }else{
      setIsLoading(false);
    }
  }, []);

  if (isLoading || !globalData) {
    return <Loading />;
  }

  const { verticals, locales } = globalData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedCatalog = {
      name,
      is_primary: isPrimary,
      vertical_id: verticalId,
      locale_ids: JSON.stringify(localeIds.map(Number)),
    };


    try {
      const method = catalogIdAsNumber ? 'PUT' : 'POST' 
      const response = await fetch(`${API_URL}/catalogs/${catalogId}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCatalog),
      });
      if (response.ok) {
        navigate(`/catalogs`);
      } else {
        throw new Error("Failed to update catalog");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section>
      <h1>{catalogIdAsNumber ? 'Edit' : 'Create'} Catalog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={1}
          />
        </div>

        <div>
          <label htmlFor="isPrimary">Is Primary</label>
          <input
            id="isPrimary"
            type="checkbox"
            checked={isPrimary}
            onChange={(e) => setIsPrimary(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor="verticalId">Vertical</label>
          <select
            id="verticalId"
            value={verticalId}
            onChange={(e) => setVerticalId(Number(e.target.value))}
            required
          >
            <option value="">Select Vertical</option>
            {verticals.map((vertical: Vertical) => (
              <option key={vertical.id} value={vertical.id}>
                {vertical.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="localeIds">Locales</label>
          <p>CTRL + click to select multiple</p>
          <select
            id="localeIds"
            multiple
            value={localeIds}
            onChange={(e) => {
              const selectedOptions = Array.from(
                e.target.selectedOptions
              ).map((option) => option.value);
              setLocaleIds(selectedOptions);
            }}
          >
            {locales.map((locale: Locale) => (
              <option key={locale.id} value={String(locale.id)}>
                {locale.locale_id}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Save</button>
      </form>
    </section>
  );
};
