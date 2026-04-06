// src/pages/legal/Privacy.tsx
import LegalLayout, { Sec, Hl, InfoBox, Ul, P, LTable } from './LegalLayout'

export default function PrivacyPage() {
  return (
    <LegalLayout title="개인정보처리방침" tag="Privacy Policy">
      <div style={{ background: '#fff', borderRadius: 16, padding: '24px 28px', marginBottom: 28, border: '1px solid var(--bd)' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>목차</div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['수집하는 개인정보 항목 및 수집방법','개인정보의 수집·이용 목적','개인정보의 보유·이용 기간','개인정보의 제3자 제공','개인정보 처리 위탁','정보주체의 권리·의무 및 행사방법','개인정보의 안전성 확보 조치','쿠키의 운영','개인정보 보호책임자','방침 변경'].map((item, i) => (
            <li key={i}><a href={`#s${i+1}`} style={{ fontSize: 14, color: 'var(--slate)', display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--acc3)', display: 'inline-block', flexShrink: 0 }} />
              제{i+1}조 {item}
            </a></li>
          ))}
        </ul>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 16, border: '1px solid var(--bd)' }}>
        <P>HiAcademy(이하 "회사")는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 준수합니다. 본 방침은 회사가 제공하는 학원 관리 서비스 이용과 관련하여 수집·이용·보관·파기되는 개인정보에 관한 사항을 규정합니다.</P>
      </div>

      <Sec num="1" title="수집하는 개인정보 항목 및 수집방법">
        <P><strong>① 필수 수집 항목</strong></P>
        <Ul items={['원장/교사: 이름, 이메일, 비밀번호(암호화 저장), 휴대전화번호, 학원명, 학원 주소','학부모: 이름, 휴대전화번호','학생: 이름, 학년, 생년월일','결제 정보: 신용카드번호(PG사 토큰화 처리, 회사는 보관하지 않음), 결제 내역']} />
        <P><strong>② 자동 수집 항목</strong></P>
        <Ul items={['서비스 이용 기록, IP 주소, 쿠키, 접속 기기 정보, 브라우저 종류, 접속 일시']} />
        <P><strong>③ 수집 방법</strong></P>
        <Ul items={['회원가입 및 서비스 이용 과정에서 이용자가 직접 입력','서비스 이용 중 자동 생성·수집','고객센터 문의 및 이벤트 참여 시 수집']} />
      </Sec>

      <Sec num="2" title="개인정보의 수집·이용 목적">
        <Ul items={['서비스 제공: 학원 출석·수납·공지·숙제 관리 기능 제공','회원 관리: 본인 확인, 서비스 이용 자격 확인, 불량 회원 제재','결제 처리: 요금제 결제, 환불, 세금계산서 발행','고객 지원: 문의 처리, 장애 대응, 서비스 개선','법령 준수: 전자상거래법 등 관계 법령에 따른 기록 보존','마케팅(동의 시): 신규 기능 안내, 이벤트 정보 발송']} />
      </Sec>

      <Sec num="3" title="개인정보의 보유·이용 기간">
        <P>원칙적으로 개인정보 수집·이용 목적이 달성된 후에는 지체 없이 파기합니다. 단, 관계 법령에 따라 아래와 같이 보존합니다.</P>
        <LTable
          headers={['보존 항목','보존 기간','근거 법령']}
          rows={[
            ['계약·청약 철회 기록','5년','전자상거래법'],
            ['대금결제·재화 공급 기록','5년','전자상거래법'],
            ['소비자 불만·분쟁 기록','3년','전자상거래법'],
            ['접속 로그 기록','3개월','통신비밀보호법'],
          ]}
        />
      </Sec>

      <Sec num="4" title="개인정보의 제3자 제공">
        <P>회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 아래의 경우는 예외로 합니다.</P>
        <Ul items={['이용자가 사전에 동의한 경우','법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차에 따른 요청이 있는 경우']} />
        <P><strong>결제 처리를 위한 개인정보 제공</strong></P>
        <LTable headers={['제공받는 자','제공 항목','제공 목적','보유 기간']} rows={[['토스페이먼츠(주) 등 PG사','결제 정보','결제 처리 및 취소','관계 법령에 따름']]} />
      </Sec>

      <Sec num="5" title="개인정보 처리 위탁">
        <P>회사는 서비스 향상을 위해 아래와 같이 개인정보 처리를 위탁합니다.</P>
        <LTable
          headers={['수탁업체','위탁 업무','보유 기간']}
          rows={[
            ['AWS(Amazon Web Services)','서버 인프라 운영 및 데이터 보관','위탁 계약 종료 시'],
            ['토스페이먼츠(주)','결제 처리','관계 법령에 따름'],
            ['카카오(주)','카카오 알림톡 발송','위탁 계약 종료 시'],
          ]}
        />
      </Sec>

      <Sec num="6" title="정보주체의 권리·의무 및 행사방법">
        <P>이용자는 언제든지 다음 권리를 행사할 수 있습니다.</P>
        <Ul items={['개인정보 열람 요구','오류 정정 요구','삭제 요구','처리 정지 요구']} />
        <Hl>권리 행사는 이메일(apporty@gmail.com) 또는 전화(010-5029-9455)로 하실 수 있으며, 회사는 지체 없이 조치합니다.</Hl>
        <InfoBox>기타 개인정보 침해에 관한 신고·상담은 개인정보보호위원회(privacy.go.kr, 국번없이 182) 또는 한국인터넷진흥원(privacy.kisa.or.kr, 국번없이 118)으로 문의하실 수 있습니다.</InfoBox>
      </Sec>

      <Sec num="7" title="개인정보의 안전성 확보 조치">
        <Ul items={['비밀번호 암호화(BCrypt) 저장','전송 구간 SSL/TLS 암호화 적용','데이터 저장 AES-256 암호화','접근 권한 최소화 및 정기 점검','일 1회 자동 백업 및 재해 복구 체계 운영','개인정보 취급자 정기 교육 실시','침입 탐지 및 이상 접근 모니터링']} />
      </Sec>

      <Sec num="8" title="쿠키의 운영">
        <P>회사는 서비스 이용 편의를 위해 쿠키(cookie)를 사용합니다.</P>
        <P><strong>쿠키 사용 목적:</strong> 로그인 상태 유지, 이용자 설정 저장, 서비스 이용 분석</P>
        <P><strong>쿠키 거부 방법:</strong> 브라우저 설정 → 개인정보보호 → 쿠키 차단. 단, 쿠키 거부 시 일부 서비스 이용에 제한이 생길 수 있습니다.</P>
      </Sec>

      <Sec num="9" title="개인정보 보호책임자">
        <LTable
          headers={['항목','내용']}
          rows={[
            ['성명','장경수'],
            ['직책','개인정보 보호책임자(CPO) / 대표'],
            ['이메일','apporty@gmail.com'],
            ['전화','010-5029-9455'],
            ['주소','서울특별시 동대문구 장안벚꽃로5길 19, 103동 2107호'],
          ]}
        />
      </Sec>

      <Sec num="10" title="방침 변경">
        <P>본 개인정보처리방침이 변경될 경우 시행일 7일 전부터 서비스 공지사항 및 이메일을 통해 안내합니다.</P>
      </Sec>
    </LegalLayout>
  )
}
