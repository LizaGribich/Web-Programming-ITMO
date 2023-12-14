
const DataTable = ({ data }) => {

    return (
        <table>
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Result</th>
                <th>Current time</th>
                <th>Execution time</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.x}</td>
                    <td>{item.y}</td>
                    <td>{item.r}</td>
                    <td>{item.result.toString()}</td>
                    <td>{item.currentTime}</td>
                    <td>{item.executionTime}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DataTable;
