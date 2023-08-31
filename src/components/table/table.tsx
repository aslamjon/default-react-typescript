import styled, { css } from "styled-components";
import { get, isBoolean, isNull } from "lodash";
import { formatDate, numberPrettier } from "utils";
import classNames from "classnames";
import { childrenType } from "interfaces";
// import { arrayOf, func, shape, string } from "prop-types";

const TableStyle = styled.div<{ odd: boolean }>`
	overflow: auto;
	max-width: 100vw;
	table {
		background: var(--container--bg);
		border-radius: 12px;
		width: 100%;
		border-collapse: collapse;

		overflow: hidden;
		outline: 1px solid var(--container--br);

		th,
		td {
			margin: 0;
			padding: 0.5rem;
			height: 46px;
			font-weight: 500;
			font-size: 12px;
			color: var(--table--head);

			letter-spacing: -0.01em;
			background: var(--container--bg);

			&:first-child {
				padding-left: 20px;
			}
			&:last-child {
				padding-right: 20px;
			}
		}
		th {
			text-align: left;
			color: var(--table--head);
		}
		tbody {
			tr {
				${({ odd }) =>
					odd &&
					css`
						&:nth-child(odd) {
							td {
								background: var(--table--tr);
							}
						}
					`}
			}
		}
	}

	${({ theme }) =>
		theme.mode === "dark" &&
		css`
			padding: 2px;
			table {
				outline: none;
				background: none;
				border: none;
				outline: 1px solid #00b53380;
				tbody,
				thead {
					tr {
						td,
						th {
							background-color: var(--dark-bg-color);
							color: var(--white);
						}
						&:nth-child(2n + 1) {
							td {
								background-color: var(--dark);
								color: var(--white);
							}
						}
					}
				}
			}
		`}
`;

interface renderRowArgOptions {
	rowProps: any;
	row: any;
	renderCells: childrenType;
	rowIndex: number;
	rows: any[];
	onClick: () => void;
}

interface renderCellArgOptions {
	cellProps: any;
	value: string | number;
	rowIndex?: number;
}

type columnOption = {
	Header: string | childrenType;
	accessor: string;
	cell?: ({ value, row, rowIndex }: { value: string | number; row: any; rowIndex: number }) => childrenType;
};

interface TableOptions {
	columns: columnOption[];
	data: any[];
	getHeaderProps?: () => any;
	getCellProps?: () => any;
	getColumnProps?: () => any;
	getRowProps?: () => any;
	rowProps?: any;
	cellProps?: any;
	clickRow?: (row: any) => void;
	renderRow?: ({ rowProps, row, renderCells, rowIndex, rows, onClick }: renderRowArgOptions) => childrenType;
	renderCell?: ({ cellProps, value, rowIndex }: renderCellArgOptions) => childrenType;
	className?: string;
	odd?: boolean;
}

const getDate = (cell: any) => {
	if (isBoolean(get(cell, "column.date")) && "format" in cell.column) {
		return get(cell, "value") && <span className={"dateFormat"}>{formatDate(new Date(get(cell, "value")), get(cell, "column.format"))}</span>;
	}
	return <span>{cell.render("Cell")}</span>;
};

const defaultPropGetter = () => ({});

const defaultRowProps = {};
const defaultCellProps = {};

const defaultRenderRow = ({ rowProps, row, renderCells, rowIndex, rows, onClick }: renderRowArgOptions) => (
	<tr {...{ ...rowProps, onClick }}>{renderCells}</tr>
);

const defaultRenderCell = ({ cellProps, value }: renderCellArgOptions) => <td {...cellProps}>{value}</td>;

const renderCells = ({ columns, renderCell, row }: { columns: any[]; row: any[]; renderCell: (cell: any, index: number) => childrenType }) => {
	return columns.map(renderCell);
};

const getColumn = ({ cell, rowIndex, value, row }: { cell: any; rowIndex: number; value: string | number; row: any }) => {
	if (cell.cell) return cell.cell({ column: cell, value, rowIndex, row });
	else if (cell.date) return getDate({ cell, value });
	else if (cell.money) return value && numberPrettier(value);
	else if (cell.number) return rowIndex + 1;
	else
		return (
			<span
				style={{
					...(cell.ellips
						? {
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
						  }
						: {}),
				}}
			>
				{value}
				{/* {cell.render("Cell")} */}
			</span>
		);
};

const getHeader = ({ column, index }: { column: columnOption; index: number }) => {
	if (!isNull(get(column, "customHeader", null)))
		return get(column, "customHeader", ({ column, index }: { column: columnOption; index: number }) => "")({ column, index });
	return get(column, "Header", "");
};

const Table = ({
	columns,
	data,
	getHeaderProps = defaultPropGetter,
	getCellProps = defaultPropGetter,
	getColumnProps = defaultPropGetter,
	getRowProps = defaultPropGetter,
	rowProps = defaultRowProps,
	cellProps = defaultCellProps,
	clickRow = () => "",
	renderRow = defaultRenderRow,
	renderCell = defaultRenderCell,
	className = "",
	odd = true,
	...rest
}: TableOptions) => {
	return (
		<TableStyle className={classNames("table-styled", { [className]: className })} {...{ odd }} {...rest}>
			<table>
				<thead>
					<tr>
						{columns.map((column, index) => (
							<th className="th" key={index}>
								{getHeader({ column, index })}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, i) => {
						return renderRow({
							rowProps: { "data-class": "tr", key: get(row, "_id", i) },
							rowIndex: i,
							onClick: () => clickRow(row),
							rows: data,
							row,
							renderCells: renderCells({
								columns,
								row,
								renderCell: (cell: any, ind) =>
									renderCell({
										cellProps: {
											key: ind,
											className: ind === 0 ? "first" : "",
										},
										rowIndex: i,
										value: getColumn({ cell, rowIndex: i, value: get(row, cell.accessor), row }),
									}),
							}),
						});
					})}
				</tbody>
				{/* <table {...getTableProps()}>
        <thead>
          {headerGroups.map(
            (headerGroup) =>
              headerGroup.getHeaderGroupProps().key !== "headerGroup_0" && (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                  ))}
                </tr>
              )
          )}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr onClick={() => redirect && history.push(`/cost/${get(row, "orginal.id")}`)} {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      style={{
                        color:
                          get(cell, "column.opacity") && get(data[i], `${cell.column.pathOpacity}`)
                            ? "#000"
                            : get(cell, "column.color")
                            ? get(data[i], `${cell.column.pathColor}`)
                            : "#000",
                        textDecoration:
                          get(cell, "column.opacity") && get(data[i], `${cell.column.pathOpacity}`) && "line-through",
                      }}
                      {...cell.getCellProps()}
                    >
                      {getColumnContext(get(cell, "column"), i, cell)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table> */}
			</table>
		</TableStyle>
	);
};

// Table.propTypes = {
// 	columns: arrayOf(shape({
// 		Header: string.isRequired,
// 		accessor: string.isRequired
// 	})),
// 	data: arrayOf(),
// 	getHeaderProps?: func,
// 	getCellProps?: () => any,
// 	getColumnProps?: () => any,
// 	getRowProps?: () => any,
// 	rowProps?: any,
// 	cellProps?: any,
// 	clickRow?: (row: any) => void,
// 	renderRow?: ({ rowProps, row, renderCells, rowIndex, rows, onClick }: renderRowArgOptions) => childrenType,
// 	renderCell?: ({ cellProps, value, rowIndex }: renderCellArgOptions) => childrenType,
// 	className?: string,
// 	odd?: boolean,
// }
export default Table;
