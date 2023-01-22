import { faCheck, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import s from "styles/Filter.module.scss";
import { portfolio } from "types/portfolio";
import { filterByUsed, filterToUrl } from "utils/filterByUsed";
const Filter = ({
  filter,
  setFilters,
  filters,
  router,
}: {
  filter?: portfolio[];
  filters: string[];
  router: NextRouter;
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [filtered, setFiltered] = useState<string[]>([]);
  const [show, setShow] = useState(false);

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
                      ? filterToUrl(router, element) &&
                        setFilters((prev: string[]) => [...prev, element])
                      : filterToUrl(router, element) &&
                        setFilters((prev) =>
                          prev.filter((el, ind) => el !== element)
                        )
                  }
                  value={element}
                  checked={filters.includes(element)}
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
