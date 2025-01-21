import { useState } from "react";
import {
  Field,
  formatQuery,
  QueryBuilder,
  RuleGroupType,
} from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";
import { CustomValueEditor } from "./CustomValueEditor";

const fields: Field[] = [
  { name: "movieTitle", label: "Movie Title", datatype: "movieTitle" },
];

const ConditionBuilder = () => {
  const [query, setQuery] = useState<RuleGroupType>({
    combinator: "and",
    rules: [],
  });

  return (
    <div>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={setQuery}
        controlElements={{ valueEditor: CustomValueEditor }}
      />
      <h4 className="text-2xl my-3 text-slate-700 font-semibold">
        JSON Output
      </h4>
      <div className="my-2 font-mono bg-[#f4f4f4] p-3 rounded-md">
        <pre>
          <code>{formatQuery(query, "json")}</code>
        </pre>
      </div>
    </div>
  );
};

export default ConditionBuilder;
