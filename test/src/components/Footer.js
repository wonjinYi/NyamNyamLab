import styled from 'styled-components';

export default function Footer () {
    return (
        <FooterWrap className="Footer">
            <div>
                <p>Wonjin Yi</p>
                <p><strong>냠냠램 TEST </strong>조직내부의 폐쇄적인 냠냠거리 공유 서비스</p>
            </div>
        </FooterWrap>
    );
}

const FooterWrap = styled.div`
    display : flex;
 
    width : 100%;
    padding : 20px 30px;

    background-color : #333333;
    color : #a1a1a1;
    `; 