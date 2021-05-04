// imported Modules =============================================
import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input, Button, Divider, Select, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

// imported components ==========================================
import CenterPicker from './CenterPicker';

// Main Component ===============================================
const FORMDATA_INIT_VALUE = {
    labName: null,
    lat: null,
    lng: null,
    zoom: null,
    customIcon: false,
    defaultPermission: null,
    routePw: null,
    captainEmail: null,
    captainPw: null
}

const IS_VALIDATED_INIT_VALUE = {
    labName: false,
    captainEmail: false,
}

export default function Movein({ setCurrentContent, contentsIndex }) {
    const [formData, setFormData] = useState(FORMDATA_INIT_VALUE);
    const [isValidated, setIsValidated] = useState(IS_VALIDATED_INIT_VALUE);
    const [btnLoading, setBtnLoading] = useState(IS_VALIDATED_INIT_VALUE);

    const [centerPickerVisible, setCenterPickerVisible] = useState(false);
    const [currentCenter, setCurrentCenter] = useState(null);

    useEffect(() => {
        if(currentCenter){
            setFormData({
                ...formData,
                lat: currentCenter.lat,
                lng: currentCenter.lng,
                zoom: currentCenter.zoom,
            });
        }
        
    }, [currentCenter]);

    function onChangeForm(target, value) {
        setFormData({ ...formData, [target]: value });
    }

    function validate(e) {
        let target;
        if (e.target.name) {
            target = e.target.name
        } else { // 버튼 내부의 글씨가 선택된 경우, 부모의 name받아오기
            target = e.target.parentNode.name
        }

        switch (target) {
            case 'captainEmail':
                setBtnLoading({ ...btnLoading, captainEmail: true });
                console.log('ce');
                break;
            case 'labName':
                setBtnLoading({ ...btnLoading, labName: true });
                console.log('ln');
                break;
            default:
                console.error('예상하지 못한 검증요청')
                break;
        }
    }

    function pickCenter() {
        setCurrentCenter({
            lat: formData.lat,
            lng: formData.lng,
            zoom: formData.zoom,
        });
        setCenterPickerVisible(true);
    }

    return (
        <MoveinWrap className="Movein">
            <Button onClick={e => setCurrentContent(contentsIndex.selectType)} shape="circle" icon={<LeftOutlined />}></Button>
            <ContentWrap>
                <h2>🏢 입주</h2>
                <p>몇 가지 사전정보를 알려주시면 바로 입주하실 수 있도록 도와드릴게요 👋</p>

                <Divider>대장 정보</Divider>
                <MultiInput>
                    <StyledInput placeholder="대장님의 구글계정 Email" name="captainEmail" value={formData.captainEmail} onChange={e => onChangeForm(e.target.name, e.target.value)} />
                    <Button name="captainEmail" loading={btnLoading.captainEmail} onClick={validate}>확인</Button>
                </MultiInput>

                <StyledPwInput placeholder="연구소 관리 비밀번호" name="captainPw" value={formData.captainPw} onChange={e => onChangeForm(e.target.name, e.target.value)} />

                <Divider>연구소 정보</Divider>
                <MultiInput>
                    <StyledInput placeholder="연구소 이름" name="labName" value={formData.labName} onChange={e => onChangeForm(e.target.name, e.target.value)} />
                    <Button name="labName" loading={btnLoading.labName} onClick={validate}>확인</Button>
                </MultiInput>

                <StyledPwInput placeholder="연구소 출입 비밀번호" name="routePw" value={formData.routePw} onChange={e => onChangeForm(e.target.name, e.target.value)} />
                <MultiInput>
                    <StyledInput disabled placeholder="연구소 위도" name="lat" value={formData.lat} />
                    <StyledInput disabled placeholder="연구소 경도" name="lng" value={formData.lng} />
                    <StyledInput disabled placeholder="지도 기본배율" name="zoom" value={formData.zoom} />
                    <Button onClick={pickCenter}>수정</Button>
                </MultiInput>


                <Select placeholder="연구소 기본 권한" name="defaultPermission" value={formData.defaultPermission} onChange={value => onChangeForm('defaultPermission', value)}>
                    <Select.Option value={'viewer'} key={0}>열람 가능</Select.Option>
                    <Select.Option value={'editor'} key={1}>편집 가능</Select.Option>
                </Select>

                <Divider />
                <Button>입주하기</Button>
            </ContentWrap>

            {
                centerPickerVisible
                    ? <CenterPicker
                        centerPickerVisible={centerPickerVisible} setCenterPickerVisible={setCenterPickerVisible}
                        currentCenter={currentCenter} setCurrentCenter={setCurrentCenter}
                    />
                    : null
            }


        </MoveinWrap>
    );
}

// style ========================================================
const MoveinWrap = styled.div`

    `;

const ContentWrap = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : stretch;
    height : 100%;
    `;

const MultiInput = styled.div`
    display : flex;

    & > input {
        margin-right : 4px;
    }
    & > .no-margin {
        margin-right : 0;
    }
    `;

const StyledInput = styled(Input)`
    margin-bottom : 4px;
    `;
const StyledPwInput = styled(Input.Password)`
    margin-bottom : 4px;
    `;

// function =====================================================
// *