// imported Modules =============================================
import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal, Button } from 'antd';

// imported components ==========================================
// *

// Main Component ===============================================
export default function MapsModalComment ({ nyamListSoruce, nyamid }) {

    return (
        <MapsModalCommentWrap className="MapsModalComment">
            <h1>Comment</h1>
        </MapsModalCommentWrap>
    );
}

// style ========================================================
const MapsModalCommentWrap = styled.div`
    display : flex;
    `;

// function =====================================================
// *