// src/pages/legal/Terms.tsx
import LegalLayout, { Sec, Hl, InfoBox, Ul, P, LTable } from './LegalLayout'

export function TermsPage() {
  return (
    <LegalLayout title="서비스 이용약관" tag="Terms of Service">
      <Sec num="1" title="목적">
        <P>본 약관은 디브릿지허브(이하 "회사")가 운영하는 HiAcademy 서비스(이하 "서비스")의 이용에 관한 조건 및 절차, 회사와 이용자의 권리·의무·책임 사항을 규정함을 목적으로 합니다.</P>
      </Sec>

      <Sec num="2" title="용어의 정의">
        <Ul items={['"서비스"란 회사가 제공하는 학원 관리 플랫폼(웹, 모바일 앱 포함)을 의미합니다.','"이용자"란 본 약관에 동의하고 서비스를 이용하는 학원 원장 및 교사를 의미합니다.','"계정"이란 서비스 이용을 위해 이용자가 설정한 이메일 및 비밀번호의 조합을 의미합니다.','"요금제"란 이용자가 선택한 서비스 이용 플랜을 의미합니다.']} />
      </Sec>

      <Sec num="3" title="서비스 내용">
        <Ul items={['학원 출결 관리 (출석·지각·결석·조퇴 기록)','수납 관리 (수업료·교재비 청구 및 납부 현황 관리)','공지사항 및 메시지 발송','숙제 관리 및 학부모 공유','학부모 모바일 앱 연동 (iOS / Android)','카카오 알림톡·문자 발송','기타 회사가 추가 개발·제공하는 서비스']} />
      </Sec>

      <Sec num="4" title="회원가입 및 계정 관리">
        <Ul items={['만 19세 이상 사업자(학원)만 가입할 수 있습니다.','이용자는 실제 정보로 가입해야 하며, 허위 정보 제공 시 계정이 해지될 수 있습니다.','계정 보안 유지 책임은 이용자에게 있으며, 제3자에게 계정 정보를 양도·대여할 수 없습니다.','계정 도용이 의심될 경우 즉시 회사에 신고하여야 합니다.']} />
      </Sec>

      <Sec num="5" title="요금제 및 결제">
        <LTable
          headers={['요금제','월간 금액','연간 금액 (20% 할인)','주요 제한']}
          rows={[
            ['스타터','10,000원/월','8,000원/월','학생 50명, 반 3개'],
            ['스탠다드','20,000원/월','16,000원/월','학생 100명, 반 무제한'],
            ['프리미엄','50,000원/월','40,000원/월','학생·반 무제한'],
          ]}
        />
        <Hl>30일 무료 체험 후 이용자가 직접 요금제를 선택·결제해야 서비스가 계속 이용 가능합니다. 자동 결제는 이루어지지 않습니다.</Hl>
        <Ul items={['결제는 신용카드, 체크카드로 가능합니다.','연간 결제 시 월간 금액 대비 20% 할인이 적용됩니다.','부가가치세(VAT)는 별도입니다.']} />
      </Sec>

      <Sec num="6" title="환불 정책">
        <LTable
          headers={['구분','환불 시점','환불 금액']}
          rows={[
            ['월간 요금제','결제일로부터 7일 이내','전액 환불'],
            ['월간 요금제','결제일 8일 이후','잔여 일수 비례 환불'],
            ['연간 요금제','결제일로부터 30일 이내','전액 환불'],
            ['연간 요금제','결제일 31일 이후','잔여 월 기준 환불 (사용 월 제외)'],
          ]}
        />
        <InfoBox>※ 이용약관 위반으로 인한 강제 해지 시 환불이 제한될 수 있습니다. 환불 문의: admin@dbridgehub.com / 010-5029-9455</InfoBox>
      </Sec>

      <Sec num="7" title="이용자 의무">
        <P>이용자는 다음 행위를 하여서는 안 됩니다.</P>
        <Ul items={['타인의 개인정보를 무단으로 수집·이용하는 행위','서비스를 이용하여 법령 또는 본 약관을 위반하는 행위','계정 정보를 타인에게 양도·대여하는 행위','서비스를 역설계·해킹·크롤링하는 행위','회사의 지식재산권을 침해하는 행위']} />
      </Sec>

      <Sec num="8" title="회사의 의무">
        <Ul items={['안정적인 서비스 제공을 위해 최선을 다합니다.','이용자의 개인정보를 안전하게 관리합니다.','서비스 중단이 예상될 경우 7일 전 공지합니다.','이용자의 문의에 성실히 답변합니다.']} />
      </Sec>

      <Sec num="9" title="서비스 중단">
        <P>회사는 다음의 경우 서비스를 일시 중단할 수 있습니다.</P>
        <Ul items={['시스템 점검·교체·고장','천재지변, 국가 비상사태 등 불가항력적 사유','전기통신사업자의 서비스 중단']} />
        <P>예정된 점검은 7일 전 공지하며, 긴급한 경우 즉시 공지합니다.</P>
      </Sec>

      <Sec num="10" title="면책조항">
        <Ul items={['회사는 이용자가 서비스를 통해 등록·저장한 데이터의 정확성·적법성에 대해 책임지지 않습니다.','이용자 간 또는 이용자와 제3자 간의 분쟁에 대해 회사는 개입하지 않으며 책임지지 않습니다.','이용자의 귀책사유로 인한 서비스 이용 장애에 대해 회사는 책임지지 않습니다.']} />
      </Sec>

      <Sec num="11" title="분쟁 해결">
        <P>본 약관과 관련한 분쟁은 대한민국 법률을 적용합니다. 소송이 제기될 경우 회사 소재지(서울특별시 동대문구)를 관할하는 법원을 전속 관할 법원으로 합니다.</P>
      </Sec>
    </LegalLayout>
  )
}

// ── 환불정책 ─────────────────────────────────────
export function RefundPage() {
  return (
    <LegalLayout title="환불 정책" tag="Refund Policy">
      <div style={{ background: 'linear-gradient(135deg,var(--acc3),rgba(108,99,255,.05))', borderRadius: 20, padding: '28px 32px', marginBottom: 24, border: '2px solid var(--acc3)', display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--acc)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>🎁</div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--navy)', marginBottom: 5 }}>30일 무료 체험 안내</div>
          <div style={{ fontSize: 14, color: 'var(--slate)' }}>무료 체험 기간에는 요금이 전혀 청구되지 않습니다. 체험 종료 후 자동 결제는 없으며, 이용자가 직접 요금제를 선택해야 서비스를 계속 이용할 수 있습니다.</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 16, border: '1px solid var(--bd)' }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy)', marginBottom: 20, paddingBottom: 12, borderBottom: '2px solid var(--ok2)' }}>📅 월간 요금제 환불</div>
        <LTable
          headers={['환불 시점','환불 금액','비고']}
          rows={[
            ['결제일로부터 7일 이내','전액 환불','결제 취소 처리'],
            ['결제일 8일 이후','잔여 일수 비례 환불','일할 계산 후 환불'],
          ]}
        />
        <P>예시) 30,000원 월간 결제 후 15일 경과 시 → 약 15,000원 환불 (잔여 15일 기준)</P>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 16, border: '1px solid var(--bd)' }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy)', marginBottom: 20, paddingBottom: 12, borderBottom: '2px solid var(--ok2)' }}>📆 연간 요금제 환불</div>
        <LTable
          headers={['환불 시점','환불 금액','비고']}
          rows={[
            ['결제일로부터 30일 이내','전액 환불','결제 취소 처리'],
            ['결제일 31일 이후','잔여 월 기준 환불','사용한 월 제외 후 환불'],
          ]}
        />
        <P>예시) 연간 결제(12개월) 후 3개월 경과 시 → 잔여 9개월치 환불 (사용 3개월 제외)</P>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 16, border: '1px solid var(--bd)' }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy)', marginBottom: 20, paddingBottom: 12, borderBottom: '2px solid var(--ok2)' }}>📞 환불 신청 방법</div>
        <P>아래 연락처로 환불을 신청해 주세요. 영업일 기준 1–2일 이내에 확인 후 처리해드립니다.</P>
        <div style={{ background: 'linear-gradient(135deg,var(--acc3),rgba(108,99,255,.05))', borderRadius: 16, padding: '24px 28px', border: '1px solid rgba(108,99,255,.2)' }}>
          {[['✉️','이메일 (24시간 접수)','admin@dbridgehub.com'],['📞','전화 (평일 09:00–18:00)','010-5029-9455'],['⏱️','처리 기간','영업일 기준 3–5일 이내']].map(([icon, label, value]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--acc3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--slate)', marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{value}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#FFF8E6', borderRadius: 12, padding: '16px 20px', fontSize: 12, color: '#92400E', borderLeft: '4px solid var(--warn)', marginTop: 16, lineHeight: 1.8 }}>
          ※ 환불은 원래 결제 수단으로 처리됩니다.<br/>
          ※ 카드 취소의 경우 카드사 사정에 따라 영업일 기준 3–7일이 소요될 수 있습니다.<br/>
          ※ 이용약관 위반으로 인한 강제 해지 시 환불이 제한될 수 있습니다.
        </div>
      </div>
    </LegalLayout>
  )
}
