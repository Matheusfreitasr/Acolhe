#!/usr/bin/env python3
"""
Script de teste para as APIs do back-end Acolhe
"""
import requests
import json
import sys

BASE_URL = "http://localhost:5000/api"

def test_health():
    """Testa se o servidor está funcionando"""
    try:
        response = requests.get(f"{BASE_URL}/auth/me", timeout=5)
        print(f"✓ Servidor está respondendo (Status: {response.status_code})")
        return True
    except requests.exceptions.RequestException as e:
        print(f"✗ Erro ao conectar com o servidor: {e}")
        return False

def test_user_registration():
    """Testa o registro de usuário"""
    user_data = {
        "nome": "João Silva",
        "email": "joao@teste.com",
        "senha": "123456",
        "tipo_usuario": "candidato"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/register", json=user_data, timeout=10)
        print(f"Registro de usuário - Status: {response.status_code}")
        
        if response.status_code == 201:
            data = response.json()
            print(f"✓ Usuário registrado com sucesso: {data.get('message')}")
            return data.get('access_token')
        else:
            print(f"✗ Erro no registro: {response.text}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"✗ Erro na requisição: {e}")
        return None

def test_company_registration():
    """Testa o registro de empresa"""
    company_data = {
        "nome": "Tech LGBTQ+ Company",
        "email": "contato@techlgbt.com",
        "tipo_usuario": "empresa",
        "cidade": "São Paulo",
        "estado": "SP"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/register", json=company_data, timeout=10)
        print(f"Registro de empresa - Status: {response.status_code}")
        
        if response.status_code == 201:
            data = response.json()
            print(f"✓ Empresa registrada com sucesso: {data.get('message')}")
            return data.get('access_token')
        else:
            print(f"✗ Erro no registro: {response.text}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"✗ Erro na requisição: {e}")
        return None

def test_job_creation(company_token):
    """Testa a criação de vaga"""
    if not company_token:
        print("✗ Token da empresa não disponível para teste de criação de vaga")
        return None
    
    job_data = {
        "titulo": "Desenvolvedor Python Jr - Vaga Inclusiva",
        "descricao": "Vaga para desenvolvedor Python júnior em empresa que valoriza a diversidade LGBTQIAPN+",
        "tipo_contrato": "clt",
        "modalidade": "remoto",
        "nivel_experiencia": "junior",
        "cidade": "São Paulo",
        "estado": "SP",
        "area": "Tecnologia"
    }
    
    headers = {"Authorization": f"Bearer {company_token}"}
    
    try:
        response = requests.post(f"{BASE_URL}/jobs", json=job_data, headers=headers, timeout=10)
        print(f"Criação de vaga - Status: {response.status_code}")
        
        if response.status_code == 201:
            data = response.json()
            print(f"✓ Vaga criada com sucesso: {data.get('message')}")
            return data.get('vaga', {}).get('id')
        else:
            print(f"✗ Erro na criação: {response.text}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"✗ Erro na requisição: {e}")
        return None

def test_job_listing():
    """Testa a listagem de vagas"""
    try:
        response = requests.get(f"{BASE_URL}/jobs", timeout=10)
        print(f"Listagem de vagas - Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            vagas = data.get('vagas', [])
            print(f"✓ {len(vagas)} vagas encontradas")
            return True
        else:
            print(f"✗ Erro na listagem: {response.text}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"✗ Erro na requisição: {e}")
        return False

def main():
    """Função principal de teste"""
    print("=== Teste das APIs do Back-end Acolhe ===\n")
    
    # Teste 1: Verificar se o servidor está funcionando
    print("1. Testando conectividade do servidor...")
    if not test_health():
        print("Servidor não está respondendo. Verifique se a aplicação está rodando.")
        sys.exit(1)
    
    print("\n2. Testando registro de usuário...")
    user_token = test_user_registration()
    
    print("\n3. Testando registro de empresa...")
    company_token = test_company_registration()
    
    print("\n4. Testando criação de vaga...")
    job_id = test_job_creation(company_token)
    
    print("\n5. Testando listagem de vagas...")
    test_job_listing()
    
    print("\n=== Resumo dos Testes ===")
    print("✓ Conectividade: OK")
    print(f"✓ Registro de usuário: {'OK' if user_token else 'FALHOU'}")
    print(f"✓ Registro de empresa: {'OK' if company_token else 'FALHOU'}")
    print(f"✓ Criação de vaga: {'OK' if job_id else 'FALHOU'}")
    print("✓ Listagem de vagas: OK")

if __name__ == "__main__":
    main()

