import { faCheck, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import s from "styles/Filter.module.scss";
import { portfolio } from "types/portfolio";
import { filterByUsed } from "utils/filterByUsed";
const Filter = ({
  filter,
  setFilters,
}: {
  filter?: portfolio[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const router = useRouter();
  const [filtered, setFiltered] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof router.query.filter === "string")
      setFilters([router.query?.filter]);
  }, []);
  useEffect(() => {
    filter && filterByUsed(filter).then((e) => setFiltered(e));
  }, [filter]);
  return (
    <div style={show ? { maxHeight: "100vh" } : {}} className={s.container}>
      <FontAwesomeIcon
        onClick={() => setShow(!show)}
        className={s.icon}
        icon={faSliders}
      />
      <div className={s.filters}>
        {filtered &&
          filtered.map((element, i) => {
            return (
              <label key={i}>
                <input
                  onChange={(e) =>
                    e.target.checked
                      ? setFilters((prev: any) => [...prev, element])
                      : setFilters((prev) =>
                          prev.filter((el, ind) => el !== element)
                        )
                  }
                  value={element}
                  type="checkbox"
                />
                <span>
                  <FontAwesomeIcon className={s.icon} icon={faCheck} />
                </span>
                {element}
              </label>
            );
          })}
      </div>
    </div>
  );
};

export default Filter;
