import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import styled from 'styled-components';

const CadastroSection = styled.section`
  padding: 4rem 2rem;
  min-height: 80vh;
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.lightGray};
`;

const CadastroCard = styled(Card)`
  border: none;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  padding: 2rem;
  
  .card-header {
    background: ${props => props.theme.gradients.primaryDiagonal};
    color: white;
    border: none;
    border-radius: 12px 12px 0 0;
    text-align: center;
    padding: 1.5rem;
    margin: -2rem -2rem 2rem -2rem;
    
    h2 {
      margin: 0;
      font-weight: 600;
    }
  }
`;

const StyledForm = styled(Form)`
  .form-label {
    font-weight: 500;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.5rem;
  }
  
  .form-control {
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: 8px;
    padding: 0.75rem;
    transition: all 0.3s ease;
    
    &:focus {
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 0.2rem rgba(138, 43, 226, 0.25);
    }
  }
  
  .form-select {
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: 8px;
    padding: 0.75rem;
    transition: all 0.3s ease;
    
    &:focus {
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 0.2rem rgba(138, 43, 226, 0.25);
    }
  }
`;

const SubmitButton = styled(Button)`
  background: ${props => props.theme.gradients.primaryDiagonal};
  border: none;
  border-radius: 8px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  width: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(138, 43, 226, 0.3);
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

interface FormData {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    telefone: string;
    dataNascimento: string;
    genero: string;
    orientacaoSexual: string;
    cidade: string;
    estado: string;
    profissao: string;
    experiencia: string;
    termos: boolean;
}

const CadastroPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        telefone: '',
        dataNascimento: '',
        genero: '',
        orientacaoSexual: '',
        cidade: '',
        estado: '',
        profissao: '',
        experiencia: '',
        termos: false
    });

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'danger'>('success');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validações básicas
        if (!formData.nome || !formData.email || !formData.senha) {
            setAlertMessage('Por favor, preencha todos os campos obrigatórios.');
            setAlertType('danger');
            setShowAlert(true);
            return;
        }

        if (formData.senha !== formData.confirmarSenha) {
            setAlertMessage('As senhas não coincidem.');
            setAlertType('danger');
            setShowAlert(true);
            return;
        }

        if (!formData.termos) {
            setAlertMessage('Você deve aceitar os termos de uso.');
            setAlertType('danger');
            setShowAlert(true);
            return;
        }

        // Simular cadastro bem-sucedido
        setAlertMessage('Cadastro realizado com sucesso! Bem-vindo(a) à Acolhe+!');
        setAlertType('success');
        setShowAlert(true);

        // Limpar formulário
        setFormData({
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: '',
            telefone: '',
            dataNascimento: '',
            genero: '',
            orientacaoSexual: '',
            cidade: '',
            estado: '',
            profissao: '',
            experiencia: '',
            termos: false
        });
    };

    return (
        <MainLayout>
            <CadastroSection>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} md={8} lg={6}>
                            <CadastroCard>
                                <div className="card-header">
                                    <h2>Criar Conta</h2>
                                    <p className="mb-0">Junte-se à nossa comunidade</p>
                                </div>

                                {showAlert && (
                                    <Alert
                                        variant={alertType}
                                        onClose={() => setShowAlert(false)}
                                        dismissible
                                    >
                                        {alertMessage}
                                    </Alert>
                                )}

                                <StyledForm onSubmit={handleSubmit}>
                                    <Row>
                                        <Col xs={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Nome Completo *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="nome"
                                                    value={formData.nome}
                                                    onChange={handleInputChange}
                                                    placeholder="Digite seu nome completo"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>E-mail *</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Digite seu e-mail"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Senha *</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="senha"
                                                    value={formData.senha}
                                                    onChange={handleInputChange}
                                                    placeholder="Digite sua senha"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Confirmar Senha *</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="confirmarSenha"
                                                    value={formData.confirmarSenha}
                                                    onChange={handleInputChange}
                                                    placeholder="Confirme sua senha"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Telefone</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    name="telefone"
                                                    value={formData.telefone}
                                                    onChange={handleInputChange}
                                                    placeholder="(11) 99999-9999"
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Data de Nascimento</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="dataNascimento"
                                                    value={formData.dataNascimento}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Identidade de Gênero</Form.Label>
                                                <Form.Select
                                                    name="genero"
                                                    value={formData.genero}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Selecione...</option>
                                                    <option value="cisgênero">Cisgênero</option>
                                                    <option value="transgênero">Transgênero</option>
                                                    <option value="não-binário">Não-binário</option>
                                                    <option value="gênero-fluido">Gênero fluido</option>
                                                    <option value="outro">Outro</option>
                                                    <option value="prefiro-não-informar">Prefiro não informar</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Orientação Sexual</Form.Label>
                                                <Form.Select
                                                    name="orientacaoSexual"
                                                    value={formData.orientacaoSexual}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Selecione...</option>
                                                    <option value="heterossexual">Heterossexual</option>
                                                    <option value="homossexual">Homossexual</option>
                                                    <option value="bissexual">Bissexual</option>
                                                    <option value="pansexual">Pansexual</option>
                                                    <option value="assexual">Assexual</option>
                                                    <option value="outro">Outro</option>
                                                    <option value="prefiro-não-informar">Prefiro não informar</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Cidade</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="cidade"
                                                    value={formData.cidade}
                                                    onChange={handleInputChange}
                                                    placeholder="Digite sua cidade"
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Estado</Form.Label>
                                                <Form.Select
                                                    name="estado"
                                                    value={formData.estado}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Selecione...</option>
                                                    <option value="AC">Acre</option>
                                                    <option value="AL">Alagoas</option>
                                                    <option value="AP">Amapá</option>
                                                    <option value="AM">Amazonas</option>
                                                    <option value="BA">Bahia</option>
                                                    <option value="CE">Ceará</option>
                                                    <option value="DF">Distrito Federal</option>
                                                    <option value="ES">Espírito Santo</option>
                                                    <option value="GO">Goiás</option>
                                                    <option value="MA">Maranhão</option>
                                                    <option value="MT">Mato Grosso</option>
                                                    <option value="MS">Mato Grosso do Sul</option>
                                                    <option value="MG">Minas Gerais</option>
                                                    <option value="PA">Pará</option>
                                                    <option value="PB">Paraíba</option>
                                                    <option value="PR">Paraná</option>
                                                    <option value="PE">Pernambuco</option>
                                                    <option value="PI">Piauí</option>
                                                    <option value="RJ">Rio de Janeiro</option>
                                                    <option value="RN">Rio Grande do Norte</option>
                                                    <option value="RS">Rio Grande do Sul</option>
                                                    <option value="RO">Rondônia</option>
                                                    <option value="RR">Roraima</option>
                                                    <option value="SC">Santa Catarina</option>
                                                    <option value="SP">São Paulo</option>
                                                    <option value="SE">Sergipe</option>
                                                    <option value="TO">Tocantins</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Profissão/Área de Interesse</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="profissao"
                                                    value={formData.profissao}
                                                    onChange={handleInputChange}
                                                    placeholder="Ex: Desenvolvedor, Designer, Administrador..."
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Nível de Experiência</Form.Label>
                                                <Form.Select
                                                    name="experiencia"
                                                    value={formData.experiencia}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Selecione...</option>
                                                    <option value="iniciante">Iniciante (0-2 anos)</option>
                                                    <option value="junior">Júnior (2-4 anos)</option>
                                                    <option value="pleno">Pleno (4-7 anos)</option>
                                                    <option value="senior">Sênior (7+ anos)</option>
                                                    <option value="especialista">Especialista/Líder</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <Form.Group className="mb-4">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="termos"
                                                    checked={formData.termos}
                                                    onChange={handleInputChange}
                                                    label={
                                                        <>
                                                            Eu aceito os{' '}
                                                            <Link to="/termos-uso" target="_blank">
                                                                Termos de Uso
                                                            </Link>{' '}
                                                            e a{' '}
                                                            <Link to="/politica-privacidade" target="_blank">
                                                                Política de Privacidade
                                                            </Link>
                                                        </>
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <SubmitButton type="submit">
                                                Criar Conta
                                            </SubmitButton>
                                        </Col>
                                    </Row>
                                </StyledForm>

                                <LoginLink>
                                    Já tem uma conta?{' '}
                                    <Link to="/login">Faça login aqui</Link>
                                </LoginLink>
                            </CadastroCard>
                        </Col>
                    </Row>
                </Container>
            </CadastroSection>
        </MainLayout>
    );
};

export default CadastroPage;

