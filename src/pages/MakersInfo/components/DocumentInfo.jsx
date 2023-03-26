import {useEffect, useRef, useState} from 'react';
import {Button, Label, Table, TableCell} from 'semantic-ui-react';
import styled from 'styled-components';
import {useGetDocuments, useModifyDocuments} from '../../../hook/useMakersInfo';
import {ReactComponent as FileSvg} from '../../../assets/icon/file.svg';
import {ReactComponent as CloseIcon} from '../../../assets/icon/close.svg';

const DocumentInfo = () => {
  const licenseRef = useRef(null);
  const permitRef = useRef(null);
  const accountRef = useRef(null);
  const [sendData, setSendData] = useState([]);
  const [showLicense, setShowLicense] = useState(null);
  const [showPermit, setShowPermit] = useState(null);
  const [showAccount, setShowAccount] = useState(null);
  const [licenseData, setLicenseData] = useState(null);
  const [permitData, setPermitData] = useState(null);
  const [accountData, setAccountData] = useState(null);

  const {data: documentsData} = useGetDocuments();
  const {mutateAsync: EditDocuments} = useModifyDocuments();

  const handleImageUpload = (e, id) => {
    let reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      if (id === 0) {
        setLicenseData(e.target.files[0]);
      }
      if (id === 1) {
        setPermitData(e.target.files[0]);
      }
      if (id === 2) {
        setAccountData(e.target.files[0]);
      }
    }

    reader.onloadend = () => {
      const previewImgUrl = reader.result;

      if (previewImgUrl && id === 0) {
        setShowLicense(previewImgUrl);
      }
      if (previewImgUrl && id === 1) {
        setShowPermit(previewImgUrl);
      }
      if (previewImgUrl && id === 2) {
        setShowAccount(previewImgUrl);
      }
    };
  };

  const updateContent = async e => {
    const formData = new FormData();
    formData.append('businessLicense', licenseData);
    formData.append('businessPermit', permitData);
    formData.append('accountCopy', accountData);

    const json = JSON.stringify(sendData);
    const blob = new Blob([json], {type: 'application/json'});
    formData.append('images', blob);

    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };
    // for (let value of formData.keys()) {
    //   console.log(value);
    // }

    await EditDocuments(formData, config);
    setLicenseData(null);
    setPermitData(null);
    setAccountData(null);
    setShowLicense(null);
    setShowPermit(null);
    setShowAccount(null);
  };

  const deletePreviewImage = () => {
    if (showLicense) {
      setShowLicense(null);
      setLicenseData(null);
    }

    if (showPermit) {
      setShowPermit(null);
      setPermitData(null);
    }
    if (showAccount) {
      setShowAccount(null);
      setAccountData(null);
    }
  };

  const deleteImage = type => {
    const newImageURL = sendData.filter(el => el.imageType !== type);

    setSendData(newImageURL);
  };

  const deletePreViewImage = type => {
    const image = sendData.filter(el => el.imageType !== type);

    setSendData(image);
  };

  const labelArr = sendData?.map(el => el.imageType);

  useEffect(() => {
    setSendData(documentsData?.data?.data);
  }, [documentsData?.data?.data]);

  return (
    <Wrap>
      <ButtonWrap>
        <h3>서류 정보</h3>
        <Button content="저장" color="green" onClick={e => updateContent(e)} />
      </ButtonWrap>
      <Table celled>
        <Table.Body>
          <Table.Row>
            <Cell width={2} textAlign="center">
              사업자등록증
            </Cell>
            <Table.Cell>
              <div style={{height: 220}}>
                <UploadButtonWrap style={{padding: 4, minHeight: 200}}>
                  {!labelArr?.includes(1) && (
                    <UploadButton htmlFor="licenseInput">
                      <div>
                        <FileImage />
                        이미지 업로드
                      </div>
                    </UploadButton>
                  )}
                  <Input
                    id="licenseInput"
                    ref={licenseRef}
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      handleImageUpload(e, 0);
                    }}
                  />
                  {showLicense && (
                    <PositionWrap>
                      <Image src={showLicense} alt="사업자 등록증" />
                      <CloseButton onClick={deletePreviewImage}>
                        <CloseIcon />
                      </CloseButton>
                    </PositionWrap>
                  )}
                  <div>
                    {sendData
                      ?.filter(el => el.imageType === 1)
                      .map(v => (
                        <div key={v.imageType}>
                          <div style={{position: 'relative'}}>
                            <Image src={v.location} alt="" />
                            <CloseButton
                              onClick={() => {
                                deleteImage(v.imageType);
                                deletePreViewImage(v.imageType);
                              }}>
                              <CloseIcon />
                            </CloseButton>
                          </div>
                        </div>
                      ))}
                  </div>
                </UploadButtonWrap>
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Cell textAlign="center">영업신고증</Cell>
            <Table.Cell>
              <div style={{height: 220}}>
                <UploadButtonWrap style={{padding: 4, minHeight: 200}}>
                  {!labelArr?.includes(2) && (
                    <UploadButton htmlFor="permitInput">
                      <div>
                        <FileImage />
                        이미지 업로드
                      </div>
                    </UploadButton>
                  )}
                  <Input
                    id="permitInput"
                    ref={permitRef}
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      handleImageUpload(e, 1);
                    }}
                  />
                  {showPermit && (
                    <PositionWrap>
                      <Image src={showPermit} alt="영업 신고증" />
                      <CloseButton onClick={deletePreviewImage}>
                        <CloseIcon />
                      </CloseButton>
                    </PositionWrap>
                  )}
                  <div>
                    {sendData
                      ?.filter(el => el.imageType === 2)
                      .map(v => (
                        <div key={v.imageType}>
                          <div style={{position: 'relative'}}>
                            <Image src={v.location} alt="" />
                            <CloseButton
                              onClick={() => {
                                deleteImage(v.imageType);
                                deletePreViewImage(v.imageType);
                              }}>
                              <CloseIcon />
                            </CloseButton>
                          </div>
                        </div>
                      ))}
                  </div>
                </UploadButtonWrap>
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Cell textAlign="center">통장사본</Cell>
            <Table.Cell>
              <div style={{height: 220}}>
                <UploadButtonWrap style={{padding: 4, minHeight: 200}}>
                  {!labelArr?.includes(3) && (
                    <UploadButton htmlFor="accountInput">
                      <div>
                        <FileImage />
                        이미지 업로드
                      </div>
                    </UploadButton>
                  )}
                  <Input
                    id="accountInput"
                    ref={accountRef}
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      handleImageUpload(e, 2);
                    }}
                  />
                  {showAccount && (
                    <PositionWrap>
                      <Image src={showAccount} alt="통장사본" />
                      <CloseButton onClick={deletePreviewImage}>
                        <CloseIcon />
                      </CloseButton>
                    </PositionWrap>
                  )}
                  <div>
                    {sendData
                      ?.filter(el => el.imageType === 3)
                      .map(v => (
                        <div key={v.imageType}>
                          <div style={{position: 'relative'}}>
                            <Image src={v.location} alt="" />
                            <CloseButton
                              onClick={() => {
                                deleteImage(v.imageType);
                                deletePreViewImage(v.imageType);
                              }}>
                              <CloseIcon />
                            </CloseButton>
                          </div>
                        </div>
                      ))}
                  </div>
                </UploadButtonWrap>
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Wrap>
  );
};

export default DocumentInfo;

const Wrap = styled.div`
  margin-top: 24px;
`;

const Cell = styled(Table.Cell)`
  background-color: #f5f5f5;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 200px;
`;

const Input = styled.input`
  display: none;
`;

const UploadButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UploadButton = styled.label`
  background: #5a1eff;
  border-radius: 8px;
  width: 111px;
  height: 34px;
  padding: 8px;
  cursor: pointer;
  div {
    color: white;
  }
`;

const FileImage = styled(FileSvg)`
  margin-right: 4px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`;

const PositionWrap = styled.div`
  position: relative;
`;
