// imported Modules =============================================
import { React, useState, useEffect } from "react";
import ScriptTag from "react-script-tag";
import styled from "styled-components";

// imported components ==========================================
import MapsModal from "./leaders/MapsModal";
import NyamEditor from "./followers/NyamEditor";
import Loading from "../atoms/Loading";

// imported supporters
import DataStorage from "../../DataStorage";
import initNaverMaps from "../supporters/initNaverMaps";
import readContents from "../supporters/readContents";
import createNyamMarkers from "../supporters/createNyamMarkers";
import createCenterMarker from "../supporters/createCenterMarker";

// Main Component ===============================================
let map = null; // naver maps object

const CONTENT_SOURCE = DataStorage("CONTENT_SOURCE");
const MAP_SOURCE = DataStorage("MAP_SOURCE");
const NYAM_TYPES = DataStorage("NYAM_TYPES_KEY");

export default function Maps({ filters, isPickmode, nyamEditorTaskType, setIsPickmode, setNyamEditorTaskType }) {
    const [nyams, setNyams] = useState(null);
    const [markers, setMarkers] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [selectedNyam, setSelectedNyam] = useState(null);
    const [pickCoord, setPickCoord] = useState({ x: 0, y: 0 }); // 새로 추가할 냠의 좌표값. { x : 123, y : 123 }

    const [mapsModalVisible, setMapsModalVisible] = useState(false);
    const [nyamEditorModalVisible, setNyamEditorModalVisible] = useState(false);

    // 마커 visible 속성 변경
    useEffect(() => {
        if (markers !== null) {
            setMarkersVisible(filters, setIsLoading, markers);
        }
    }, [filters, markers]);

    // 마커위치 선택
    useEffect(() => {
        if (map != null) {
            if (isPickmode === true) {
                map.setCursor("Crosshair");
                const listener = window.naver.maps.Event.addListener(map, 'click', function (e) { // 클릭이 들어왔으면
                    if (isPickmode === true) {
                        const { x, y } = e.coord;
                        setPickCoord({ x, y }); // 좌표값 저장하고
                        setIsPickmode(false); // 선택모드 끄고
                        setNyamEditorModalVisible(true); // 냠에디터 켜
                        window.naver.maps.Event.removeListener(listener);
                    }
                });
            } else if (isPickmode === false) {
                map.setCursor("Move");
            }
        }
    }, [isPickmode, setIsPickmode]);

    // 지도 refreshMaps() 된다음, selectedNyam내용 업데이트
    useEffect(() => {
        if (selectedNyam != null) {
            const { type, id } = selectedNyam;
            const index = nyams[type].findIndex(nyam => nyam.id === id)
            setSelectedNyam(nyams[type][index]);
        }
    }, [nyams, selectedNyam]);

    async function refreshMaps() {
        // 기존의 마커 모두 삭제하기
        for (let arr of Object.values(markers)) {
            arr.forEach(marker => {
                marker.setMap(null);
            });
        }

        // 다시 만들기
        const { rawNyamList } =  await readContents(CONTENT_SOURCE);
        createNyamMarkers(map, NYAM_TYPES, rawNyamList, setMarkers, setNyams, setMapsModalVisible, setSelectedNyam);
        // 이후 바로 위 useEffect에서 selectedNyam 내용 갱신.
    }

    return (
        <MapsWrap className="Maps">
            <ScriptTag
                type="text/javascript" src={MAP_SOURCE}
                onLoad={async () => {
                    setIsLoading(true);

                    const { rawNyamList, setting } = await readContents(CONTENT_SOURCE);
                    map = initNaverMaps(setting);
                    createNyamMarkers(map, NYAM_TYPES, rawNyamList, setMarkers, setNyams, setMapsModalVisible, setSelectedNyam);
                    createCenterMarker(map, setting);

                    setIsLoading(false);
                }}
            />
            <Map id="map"></Map>

            <MapsModal
                nyamListSource={CONTENT_SOURCE} selectedNyam={selectedNyam}
                refreshMaps={refreshMaps}
                mapsModalVisible={mapsModalVisible} setMapsModalVisible={setMapsModalVisible}
                setNyamEditorModalVisible={setNyamEditorModalVisible} setNyamEditorTaskType={setNyamEditorTaskType}
            />

            <NyamEditor
                taskType={nyamEditorTaskType} pickCoord={pickCoord} defaultNyamValue={selectedNyam}
                refreshMaps={refreshMaps}
                nyamEditorModalVisible={nyamEditorModalVisible} setNyamEditorModalVisible={setNyamEditorModalVisible}
                setIsPickmode={setIsPickmode} setMapsModalVisible={setMapsModalVisible}
            />

            <Loading isLoading={isLoading} />
        </MapsWrap>
    );
}

// style ========================================================
const MapsWrap = styled.div`
    display : flex;
    flex : 1;
    `;

const Map = styled.div`
    width: 100%;
    height : 100%;
    `;

// function =====================================================
const setMarkersVisible = (filters, setIsLoading, markers) => {
    setIsLoading(true);

    const types = NYAM_TYPES; // 정의되어있는 type배열 불러오기

    types.forEach(type => {
        const target = markers[type]; // markers의 한 type을 대상으로 정함
        if (target.length === 0) { return; } // 대상이 비어있으면 바로 함수종료

        const dest = filters[type]; // 업데이트 하려고 하는 값
        if (target[0].getVisible() !== dest) { // target안의 첫번째 마커의 visible속성과, 업데이트 하려고 하는 값이 다르면 (어차피 첫번째 마커 visible값이랑, 전체 마커 visible값이랑 똑같을거기 때문)
            target.forEach(marker => { marker.setVisible(dest); }); // 업데이트!
            return;
        }
    });

    setIsLoading(false);
}