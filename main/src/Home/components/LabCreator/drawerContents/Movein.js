// imported Modules =============================================
import { React, useState, useEffect } from 'react';

import axios from 'axios';

import styled from 'styled-components';
import { Input, Button, Divider, Select, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

// imported components ==========================================
import Loading from '../../../../ShareComponents/atoms/Loading';

import CenterPicker from './CenterPicker';

// Main Component ===============================================
import DataStorage from '../../../../DataStorage';
const SEND_CHECK_MAIL = DataStorage('SEND_CHECK_MAIL');
const ROUTE_MANAGER = DataStorage('ROUTE_MANAGER');
const CREATE_NEWLAB_MOVEIN = DataStorage('CREATE_NEWLAB_MOVEIN');

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
    all: false,
    labName: false,
    captainEmail: false,
}

export default function Movein({ setCurrentContent, contentsIndex, setLabCreatorVisible }) {
    const [formData, setFormData] = useState(FORMDATA_INIT_VALUE);
    const [isValidated, setIsValidated] = useState(IS_VALIDATED_INIT_VALUE);
    const [btnLoading, setBtnLoading] = useState(IS_VALIDATED_INIT_VALUE);

    const [isLoading, setIsLoading] = useState(false);

    const [centerPickerVisible, setCenterPickerVisible] = useState(false);
    const [currentCenter, setCurrentCenter] = useState(null);

    useEffect(() => {
        if (currentCenter) {
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

    async function validate(e) {
        // target 정하기
        let target;
        if (e.target.name) {
            target = e.target.name
        } else { // 버튼 내부의 글씨가 선택된 경우, 부모의 name받아오기
            target = e.target.parentNode.name
        }

        // target별 검증하기 : all, captainEmail, labName
        if (target === 'all') {
            let returnValue = true;

            for (let key of Object.keys(formData)) {
                if (formData[key] === null || formData[key] === '') {
                    message.warn('비어있는 곳을 채워주세요');
                    setIsValidated({ ...isValidated, all: true });
                    break;
                }
            }

            for (let key of Object.keys(isValidated)) {
                if (isValidated[key] === false) {
                    message.warn('대장이메일 또는 연구소이름을 확인해주세요');
                    setIsValidated({ ...isValidated, all: true });
                    break;
                }
            }
            
            return returnValue;
        } else if (target === 'captainEmail') {
            setBtnLoading({ ...btnLoading, captainEmail: true });
            const { data } = await axios.post(SEND_CHECK_MAIL, JSON.stringify({ captainEmail: formData.captainEmail }));
            if (data.status === 'success') {
                setIsValidated({ ...isValidated, captainEmail: true });
                message.info('확인메일을 보내드렸어요. 메일함을 꼭 확인해주세요!');
            } else {
                message.error('문제가 생겨 메일을 보내지 못했습니다.');
                console.error(data);
            }
            setBtnLoading({ ...btnLoading, captainEmail: false });
        } else if (target === 'labName') {
            setBtnLoading({ ...btnLoading, labName: true });

            if (await isAvailableLabName(formData.labName)) {
                setIsValidated({ ...isValidated, labName: true });
                message.success('사용 가능한 연구소 이름입니다');
            } else {
                message.error('사용할 수 없는 연구소 이름입니다');
            }
            setBtnLoading({ ...btnLoading, labName: false });
        } else {
            console.error('예상하지 못한 검증요청');
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

    async function onSubmit() {
        setIsLoading(true);

        const target = { target: { name: 'all' }};
        await validate(target);

        if (isValidated.all) {
            message.success('새 연구소를 열심히 준비하고있어요!', 0);

            const { data: { data, status } } = await axios.post(CREATE_NEWLAB_MOVEIN, JSON.stringify(formData));
            message.destroy();
            setIsLoading(false);

            if (status === 'success') {
                setCurrentContent(contentsIndex.selectType);
                setLabCreatorVisible(false);
                message.success('새로운 연구소가 성공적으로 생성되었습니다');
            } else {
                message.error('무언가 잘못되었습니다');
                console.error(data);
            }
        } else {
            setIsLoading(false);
        }
    }

    return (
        <MoveinWrap className="Movein">
            <Button onClick={e => setCurrentContent(contentsIndex.selectType)} shape="circle" icon={<LeftOutlined />}></Button>
            <ContentWrap>
                <h2>🏢 입주</h2>
                <p>몇 가지 사전정보를 알려주시면 바로 입주하실 수 있도록 도와드릴게요 👋</p>

                <Divider>대장 정보</Divider>
                <MultiInput>
                    <StyledInput placeholder="대장님의 구글계정 Email" name="captainEmail" value={formData.captainEmail} onChange={e => onChangeForm(e.target.name, e.target.value)} 
                        disabled={btnLoading.captainEmail || isValidated.captainEmail}
                    />

                    {
                        isValidated.captainEmail
                            ? <Button name="captainEmail" onClick={e => setIsValidated({ ...isValidated, captainEmail: false })}>수정</Button>
                            : <Button name="captainEmail" loading={btnLoading.captainEmail} onClick={validate}>확인</Button>
                    }
                </MultiInput>

                <StyledPwInput placeholder="연구소 관리 비밀번호" name="captainPw" value={formData.captainPw} onChange={e => onChangeForm(e.target.name, e.target.value)} />

                <Divider>연구소 정보</Divider>
                <MultiInput>
                    <StyledInput placeholder="연구소 이름" name="labName" value={formData.labName} onChange={e => onChangeForm(e.target.name, e.target.value)} 
                        disabled={btnLoading.labName || isValidated.labName} 
                    />
                    {
                        isValidated.labName
                            ? <Button name="labName" onClick={e => setIsValidated({ ...isValidated, labName: false })}>수정</Button>
                            : <Button name="labName" loading={btnLoading.labName} onClick={validate}>확인</Button>
                    }
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
                <Button onClick={onSubmit}>입주하기</Button>
            </ContentWrap>

            {
                centerPickerVisible
                    ? <CenterPicker
                        centerPickerVisible={centerPickerVisible} setCenterPickerVisible={setCenterPickerVisible}
                        currentCenter={currentCenter} setCurrentCenter={setCurrentCenter}
                    />
                    : null
            }

            <Loading isLoading={isLoading} />

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
async function isAvailableLabName(labName) {
    let isAvailable = true;



    if (labName === '' || labName === null) {
        isAvailable = false;
    } else if (containsOnlySpace(labName)) {
        isAvailable = false;
    } else {
        const { data } = await axios.get(`${ROUTE_MANAGER}?labName=${labName}`); // 연구소 이름이 중복되는지 여부
        console.log(data);
        const isUnique = data.data;
        if (!isUnique) { isAvailable = false; }
    }

    return isAvailable;
}

function containsOnlySpace(str) {
    let res = true;

    for (let i = 0; i < str.length; i++) {
        if (str != ' ') {
            res = false;
            break;
        }
    }

    return res;
}