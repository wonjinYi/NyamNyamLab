// imported Modules =============================================
import React from 'react';
import styled from 'styled-components';

// imported components ==========================================
// *

// Main Component ===============================================
export default function ContentsTable({ desc, dataOrder, data }) {
    // desc (문자열 Array) : thead에 표시할 텍스트를 차례로 나열한 문자열 배열
    // dataOrder (객체 Array) : tbody의 각 row에서 [data]객체의 요소를 표시할 순서를 나열한 문자열 배열 
    // data (객체 Array) : 원본데이터

    return (
        <ContentsTableWrap className="ContentsTable">
            <Table>
                <tbody>
                    <Row style={{borderWidth:"2px"}}>
                    {
                        desc.map( (el, index) => (
                            <Th key={index}>{ el }</Th>
                        ))
                    }
                    </Row>
                </tbody>
                
                <tbody>
                {
                    data.map( (rowItem,index) => (
                        <Row key={index}>
                        {
                            dataOrder.map( (colItem, index) => (
                                <Td key={index}>{ rowItem[colItem] }</Td>
                            ))
                        }
                        </Row>
                    ))
                }
                </tbody>
            </Table>
        </ContentsTableWrap>
    );
}

// style ========================================================
//const SPACE = "4px";
const CELL_PADDING = "8px";
const BORDER_COLOR = "#dbdbdb";

const ContentsTableWrap = styled.div`
    width : 100%;
    border : 1px solid ${BORDER_COLOR};
    border-bottom : 12px solid ${BORDER_COLOR};
    border-radius : 8px;
    `;

const Table = styled.table`
    width : 100%;
    text-align : center;
    `;

const Row = styled.tr`
    padding : ${CELL_PADDING};
    border-bottom : 1px solid ${BORDER_COLOR};
    `;

const Th = styled.th`
    padding : ${CELL_PADDING};
    `;

const Td = styled.td`
    padding : ${CELL_PADDING};
    `;
// function =====================================================
// *

                