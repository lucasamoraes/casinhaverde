import React, { useEffect } from 'react';
import { Button } from './Button';
import { SectionTitle } from './SectionTitle';
import { ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? "Política de Privacidade" : "Termos de Uso";
  const subtitle = isPrivacy ? "Seus dados seguros" : "Regras de utilização";

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <Button variant="outline" size="sm" onClick={onBack} className="mb-8 flex items-center gap-2">
          <ArrowLeft size={16} /> Voltar para Home
        </Button>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl">
          <SectionTitle title={title} subtitle={subtitle} align="left" />

          <div className="mt-8 space-y-6 text-gray-600 leading-relaxed font-body text-lg">
            {isPrivacy ? (
              <>
                <p>
                  A <strong>Escola Infantil Casinha Verde</strong> valoriza a privacidade de seus visitantes, alunos e responsáveis. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais.
                </p>
                <h3 className="text-xl font-bold text-casinha-brown pt-4">1. Coleta de Dados</h3>
                <p>
                  Coletamos informações fornecidas voluntariamente através de nossos formulários de contato e matrícula, como nome, telefone e dados da criança. Também utilizamos cookies para melhorar a experiência de navegação.
                </p>
                <h3 className="text-xl font-bold text-casinha-brown pt-4">2. Uso das Informações</h3>
                <p>
                  Os dados coletados são utilizados exclusivamente para fins pedagógicos, administrativos e de comunicação com as famílias. Não compartilhamos suas informações com terceiros sem consentimento prévio, exceto quando exigido por lei.
                </p>
                <h3 className="text-xl font-bold text-casinha-brown pt-4">3. Segurança</h3>
                <p>
                  Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou alteração.
                </p>
                <h3 className="text-xl font-bold text-casinha-brown pt-4">4. Seus Direitos</h3>
                <p>
                  Você tem o direito de solicitar o acesso, correção ou exclusão de seus dados pessoais a qualquer momento, entrando em contato com nossa secretaria.
                </p>
              </>
            ) : (
              <>
                <p>
                  Bem-vindo ao site da <strong>Escola Infantil Casinha Verde</strong>. Ao acessar e utilizar este site, você concorda com os seguintes termos e condições:
                </p>
                <h3 className="text-xl font-bold text-casinha-brown pt-4">1. Uso do Conteúdo</h3>
                <p>
                  Todo o conteúdo deste site (textos, imagens, logotipos) é de propriedade da Casinha Verde ou de seus parceiros e está protegido por leis de direitos autorais. O uso indevido ou reprodução sem autorização é proibido.
                </p>
                <h3 className="text-xl font-bold text-casinha-brown pt-4">2. Informações e Matrículas</h3>
                <p>
                  As informações sobre turmas, horários e valores apresentadas no site podem sofrer alterações. Recomendamos entrar em contato diretamente com a secretaria para confirmar detalhes e disponibilidade de vagas.
                </p>
                <h3 className="text-xl font-bold text-casinha-brown pt-4">3. Links Externos</h3>
                <p>
                  Este site pode conter links para sites de terceiros (como redes sociais ou mapas). A Casinha Verde não se responsabiliza pelo conteúdo ou políticas de privacidade desses sites externos.
                </p>
                <h3 className="text-xl font-bold text-casinha-brown pt-4">4. Alterações nos Termos</h3>
                <p>
                  Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento. O uso contínuo do site após as alterações implica na aceitação dos novos termos.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};