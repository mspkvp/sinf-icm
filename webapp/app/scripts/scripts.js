var serverUrl = 'http://localhost/FirstREST/api/'; // actualizar com o necessário
// A empresa tem de ir sempre nos headers 'empresa={{idEmpresa}}'
// byID significa que o id faz parte do url, é um simples append da variável id ao URL
var	endpointsAPI = {
	clients : { 
		default: {
			get: {
				method: 'GET',
				url: serverUrl + 'Clientes'
			},
			post: {
				method: 'POST',
				url: serverUrl + 'Clientes'
			}
		},
		byID: {
			get: {
				method: 'GET',
				url: serverUrl + 'Clientes/'
			},
			put: {
				method: 'PUT',
				url: serverUrl + 'Clientes/'
			},
			delete: {
				method: 'DELETE',
				url: serverUrl + 'Clientes/'
			}
		}
	},
	suppliers : {
		default: {
			get: {
				method: 'GET',
				url: serverUrl + 'Fornecedores'
			},
			post: {
				method: 'POST',
				url: serverUrl + 'Fornecedores'
			}
		},
		byID: {
			get: {
				method: 'GET',
				url: serverUrl + 'Fornecedores/'
			},
			put: {
				method: 'PUT',
				url: serverUrl + 'Fornecedores/'
			},
			delete: {
				method: 'DELETE',
				url: serverUrl + 'Fornecedores/'
			}
		}
	},
	articles: {
		default: {
			get: {
				method: 'GET',
				url: serverUrl + 'Artigos'
			},
			post: {
				method: 'POST',
				url: serverUrl + 'Artigos'
			}
		},
		byID: {
			get: {
				method: 'GET',
				url: serverUrl + 'Artigos/'
			},
			put: {
				method: 'PUT',
				url: serverUrl + 'Artigos/'
			},
			delete: {
				method: 'DELETE',
				url: serverUrl + 'Artigos/'
			}
		}
	},
	values: { // este n precisa da empresa no header
		default: {
			get: {
				method: 'GET',
				url: serverUrl + 'Values'
			},
			post: {
				method: 'POST',
				url: serverUrl + 'Values'
			}
		},
		byID: {
			get: {
				method: 'GET',
				url: serverUrl + 'Values/'
			},
			put: {
				method: 'PUT',
				url: serverUrl + 'Values/'
			},
			delete: {
				method: 'DELETE',
				url: serverUrl + 'Values/'
			}
		}
	},
	doc : {
		order: {
			to: {
				supplier : {
					default: {
						get: {
							method: 'GET',
							url: serverUrl + 'DocEncomendaAFornecedor'
						},
						post: {
							method: 'POST',
							url: serverUrl + 'DocEncomendaAFornecedor'
						}
					},
					byID: {
						get: {
							method: 'GET',
							url: serverUrl + 'DocEncomendaAFornecedor/'
						}
					}
				}
			},
			from: {
				client : {
					default: {
						get: {
							method: 'GET',
							url: serverUrl + 'DocEncomendaDeCliente'
						},
						post: {
							method: 'POST',
							url: serverUrl + 'DocEncomendaDeCliente'
						}
					},
					byID: {
						get: {
							method: 'GET',
							url: serverUrl + 'DocEncomendaDeCliente/'
						}
					}
				}
			}
		},
		invoice : {
			default: {
				get: {
					method: 'GET',
					url: serverUrl + 'DocFatura'
				},
				post: {
					method: 'POST',
					url: serverUrl + 'DocFatura'
				}
			},
			byID: {
				get: {
					method: 'GET',
					url: serverUrl + 'DocFatura/'
				}
			}
		},
		invoiceV : {
			default: {
				get: {
					method: 'GET',
					url: serverUrl + 'DocVFatura'
				},
				post: {
					method: 'POST',
					url: serverUrl + 'DocVFatura'
				}
			},
			byID: {
				get: {
					method: 'GET',
					url: serverUrl + 'DocVFatura/'
				}
			}
		}
	}
};