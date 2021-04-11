// imported Modules =============================================
import { React } from 'react';
import styled from 'styled-components';

// imported components ==========================================
// *

// Main Component ===============================================
export default function Footer () {
    return (
        <FooterWrap className="Footer">
            <Group>
                <Item><strong>냠냠랩 </strong> 조직 내부의 냠냠거리 공유 서비스</Item>
                <Item><strong>Contact </strong> wonjin Yi :: goranimaster17@gmail.com</Item>
            </Group>
        </FooterWrap>
    );
}

// style ========================================================
const FooterWrap = styled.div`
    display : flex;
 
    width : 100%;
    padding : 20px 30px;

    background-color : #333333;
    color : #a1a1a1;
    `; 

const Group = styled.div`

    `;

const Item = styled.p`
    margin : 0;
    `;

// function =====================================================
// *