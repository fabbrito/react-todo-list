import React from "react";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

interface Props {
  dateString: string;
  formatToPTBR?: boolean;
}

const DateItem: React.FC<Props> = ({ dateString, formatToPTBR = true }) => {
  // const dateString = date.toISOString();
  const dateISO = parseISO(dateString);
  return (
    <time dateTime={dateString} className="timestamp">
      {/* different format() string options on https://date-fns.org/v2.16.1/docs/format */}
      {!formatToPTBR
        ? format(dateISO, "LLLL d, yyyy")
        : format(dateISO, "HH:mm - dd/ MMMM/ yyyy ", {
            locale: ptBR,
          })}
    </time>
  );
};

export default DateItem;
