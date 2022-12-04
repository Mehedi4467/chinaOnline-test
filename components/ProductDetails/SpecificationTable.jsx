import React from 'react';

const SpecificationTable = ({ table }) => {
  return (
    <table className="table specification__table">
      <tbody>
        {table.map(({ PropertyName, Value }, i) => (
          <tr key={i}>
            <td className="specification__table-title">{PropertyName}</td>
            <td>{Value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SpecificationTable;
