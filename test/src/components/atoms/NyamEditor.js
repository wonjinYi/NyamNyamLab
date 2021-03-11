// imported Modules =============================================
import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal, Input, InputNumber, TimePicker, Button, Tooltip, Divider } from 'antd';
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
import { useEffect } from 'react/cjs/react.development';

// Main Component ===============================================
export default function NyamEditor ({ title, nyamEditorModalVisible, setNyamEditorModalVisible, onSubmit }) {

    const [menuItems, setMenuItems] = useState( [{name:'1', price:'2222'},{name:'2', price:'55'},{name:'3', price:'55'},{name:'4', price:'55'}] );

    function addNewItem(e) {
        setMenuItems([ ...menuItems, {name:'', price:''} ])
    }
    
    function removeItem(index) {
        setMenuItems([ ...menuItems.slice(0,index), ...menuItems.slice(index+1)]);
    }
    
    function menuItemOnChange(index, type, value) {
        setMenuItems([ ...menuItems.slice(0,index), { ...menuItems[index], [type] : value } , ...menuItems.slice(index+1)])
    }

    return (
        <NyamEditorWrap className="NyamEditor">
            <Modal
                title={"새로운 냠 만들기"}
                visible={nyamEditorModalVisible}
                onCancel={() => { setNyamEditorModalVisible(false) }}
                footer={null}
            >
                <Divider>개요</Divider>
                <StyledInput placeholder="가게 이름" />
                <StyledInput placeholder="설명" />
                
                <div style={{marginBottom:SPACE}}>
                    <Title>영업시간</Title>
                    <TimePicker format="HH:mm" placeholder="시작" />
                    <span> ~ </span>
                    <TimePicker format="HH:mm" placeholder="종료" />
                </div>
                
                <Divider>메뉴</Divider>
                <MenusWrap>
                {
                    menuItems.map( (item, index) => { 
                        console.log('가즈아', index, item);
                        return MenuItem(index, item.name, item.price, removeItem, menuItemOnChange);
                    })
                }
                    <Tooltip className="deleteComment" title="메뉴 추가" placement="left">
                        <StyledButton shape="circle" icon={<PlusOutlined />} style={{}} onClick={addNewItem} />
                    </Tooltip>
                    
                </MenusWrap>
            </Modal>
        </NyamEditorWrap>
    );
}

// style ========================================================
const SPACE = "4px";

// -- antd redefined style
const StyledInput = styled(Input)`
    margin-bottom : ${SPACE};
    `;

const StyledButton = styled(Button)`
    margin-right : ${SPACE};
`;
// -- user defined style
const NyamEditorWrap = styled.div`

    `;

const MenusWrap = styled.div`

    `;

const MenuItemWrap = styled.div`
    display : flex;
    `;

const Title = styled.span`
    font-weight : bold;
    margin-right : ${SPACE};
    `;

// function =====================================================
// *

// 유사 컴포넌트 ================================================
function MenuItem(index, name, price, removeItem, menuItemOnChange) {
    return (
        <MenuItemWrap key={index}>
            <Tooltip className="deleteComment" title="크큭.. 없.앤.다." placement="left">
                <StyledButton shape="circle" icon={<MinusOutlined />} onClick={(e) => { removeItem(index) }} />
            </Tooltip>
            <StyledInput placeholder="메뉴 이름" value={name} style={{marginRight:SPACE}} onChange={(e) => {menuItemOnChange(index,"name", e.target.value);}} />
            <StyledInput placeholder="메뉴 가격" value={price} onChange={(e) => {menuItemOnChange(index, "price", e.target.value);}} />
        </MenuItemWrap>
    )
}
