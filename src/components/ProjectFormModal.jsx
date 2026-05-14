import React from 'react';
import { ENUMS, formatEnumLabel } from '../constants/backendEnums';

function createEmptyEnvironment(index = 0) {
  return {
    id: `novo-${index + 1}`,
    nome: '',
    tipoAmbiente: '',
    acabamentoInterno: '',
    acabamentoExterno: '',
    acabamentoPerfil: '',
    acabamentoTelinha: '',
    tipoPorta: '',
    tipoPortaPassagem: '',
    tipoPuxador: '',
    tipoVidro: '',
    tipoCorredica: '',
    tipoDobradica: '',
    tipoAventos: '',
    tipoAcessorio: '',
    tipoCabideiro: '',
    tipoLed: '',
    tipoPainel: '',
    tipoRodape: '',
    observacoes: '',
    areaM2: 0,
    mdfM2: 0,
    itens: [],
  };
}

function createEmptyMaterialRow(index = 0) {
  return { id: `mat-${index + 1}`, nome: ENUMS.materiaisMdf[index] || '', percentual: index === 0 ? 100 : 0 };
}

function SelectField({ label, value, onChange, options, required = false }) {
  return (
    <label className="field-group">
      <span>{label}</span>
      <select value={value} required={required} onChange={(event) => onChange(event.target.value)}>
        <option value="">Selecione</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {formatEnumLabel(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ProjectFormModal({ open, onClose, onSubmit }) {
  const [form, setForm] = React.useState({
    nomeCliente: '',
    nomeVendedor: '',
    nomeArquiteto: '',
    materiaisMdf: [createEmptyMaterialRow(0), createEmptyMaterialRow(1), createEmptyMaterialRow(2)],
    ambientes: [createEmptyEnvironment(0)],
  });

  React.useEffect(() => {
    if (open) {
      setForm({
        nomeCliente: '',
        nomeVendedor: '',
        nomeArquiteto: '',
        materiaisMdf: [createEmptyMaterialRow(0), createEmptyMaterialRow(1), createEmptyMaterialRow(2)],
        ambientes: [createEmptyEnvironment(0)],
      });
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="novo-projeto-titulo" onClick={(event) => event.stopPropagation()}>
        <h2 id="novo-projeto-titulo">Novo projeto</h2>
        <p>Cadastro alinhado ao backend: cliente, vendedor, arquiteto, ambientes e composição MDF.</p>

        <form
          className="project-form"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit({
              nomeCliente: form.nomeCliente,
              nomeVendedor: form.nomeVendedor,
              nomeArquiteto: form.nomeArquiteto,
              materiaisMdf: form.materiaisMdf.filter((row) => row.nome && Number(row.percentual) > 0),
              ambientes: form.ambientes.filter((ambiente) => ambiente.nome && ambiente.tipoAmbiente && ambiente.acabamentoInterno && ambiente.acabamentoExterno),
            });
          }}
        >
          <div className="form-grid two-columns">
            <label className="field-group">
              <span>Nome do cliente</span>
              <input
                required
                value={form.nomeCliente}
                onChange={(event) => setForm((current) => ({ ...current, nomeCliente: event.target.value }))}
              />
            </label>

            <label className="field-group">
              <span>Nome do vendedor</span>
              <input
                value={form.nomeVendedor}
                onChange={(event) => setForm((current) => ({ ...current, nomeVendedor: event.target.value }))}
              />
            </label>

            <label className="field-group full-span">
              <span>Nome do arquiteto</span>
              <input
                value={form.nomeArquiteto}
                onChange={(event) => setForm((current) => ({ ...current, nomeArquiteto: event.target.value }))}
              />
            </label>
          </div>

          <section className="form-section">
            <div className="section-head">
              <h3>Composição MDF</h3>
              <button
                type="button"
                className="secondary-button"
                onClick={() => setForm((current) => ({ ...current, materiaisMdf: [...current.materiaisMdf, createEmptyMaterialRow(current.materiaisMdf.length)] }))}
              >
                Adicionar material
              </button>
            </div>

            <div className="stacked-list">
              {form.materiaisMdf.map((material, index) => (
                <div className="stacked-item" key={material.id}>
                  <label className="field-group">
                    <span>Material</span>
                    <select
                      value={material.nome}
                      onChange={(event) => setForm((current) => {
                        const materiaisMdf = [...current.materiaisMdf];
                        materiaisMdf[index] = { ...material, nome: event.target.value };
                        return { ...current, materiaisMdf };
                      })}
                    >
                      <option value="">Selecione</option>
                      {ENUMS.materiaisMdf.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </label>

                  <label className="field-group compact">
                    <span>%</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={material.percentual}
                      onChange={(event) => setForm((current) => {
                        const materiaisMdf = [...current.materiaisMdf];
                        materiaisMdf[index] = { ...material, percentual: event.target.value };
                        return { ...current, materiaisMdf };
                      })}
                    />
                  </label>

                  <button
                    type="button"
                    className="ghost-button"
                    onClick={() => setForm((current) => ({
                      ...current,
                      materiaisMdf: current.materiaisMdf.filter((_, materialIndex) => materialIndex !== index),
                    }))}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="form-section">
            <div className="section-head">
              <h3>Ambientes</h3>
              <button
                type="button"
                className="secondary-button"
                onClick={() => setForm((current) => ({ ...current, ambientes: [...current.ambientes, createEmptyEnvironment(current.ambientes.length)] }))}
              >
                Adicionar ambiente
              </button>
            </div>

            <div className="stacked-list">
              {form.ambientes.map((ambiente, index) => (
                <details className="stacked-item accordion-like" key={ambiente.id} open={index === 0}>
                  <summary>
                    <strong>{ambiente.nome || `Ambiente ${index + 1}`}</strong>
                    <span>{ambiente.tipoAmbiente || 'Tipo não definido'}</span>
                  </summary>

                  <div className="form-grid two-columns">
                    <label className="field-group full-span">
                      <span>Nome do ambiente</span>
                      <input
                        required
                        value={ambiente.nome}
                        onChange={(event) => setForm((current) => {
                          const ambientes = [...current.ambientes];
                          ambientes[index] = { ...ambiente, nome: event.target.value };
                          return { ...current, ambientes };
                        })}
                      />
                    </label>

                    <SelectField
                      label="Tipo de ambiente"
                      value={ambiente.tipoAmbiente}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, tipoAmbiente: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.tipoAmbiente}
                      required
                    />

                    <SelectField
                      label="Acabamento interno"
                      value={ambiente.acabamentoInterno}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, acabamentoInterno: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.acabamentoInterno}
                      required
                    />

                    <SelectField
                      label="Acabamento externo"
                      value={ambiente.acabamentoExterno}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, acabamentoExterno: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.acabamentoExterno}
                      required
                    />

                    <SelectField
                      label="Acabamento do perfil"
                      value={ambiente.acabamentoPerfil}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, acabamentoPerfil: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.acabamentoPerfil}
                    />

                    <SelectField
                      label="Telinha"
                      value={ambiente.acabamentoTelinha}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, acabamentoTelinha: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.acabamentoTelinha}
                    />

                    <SelectField
                      label="Tipo de porta"
                      value={ambiente.tipoPorta}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, tipoPorta: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.tipoPorta}
                    />

                    <SelectField
                      label="Tipo de porta passagem"
                      value={ambiente.tipoPortaPassagem}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, tipoPortaPassagem: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.tipoPortaPassagem}
                    />

                    <SelectField
                      label="Puxador"
                      value={ambiente.tipoPuxador}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, tipoPuxador: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.tipoPuxador}
                    />

                    <SelectField
                      label="Vidro"
                      value={ambiente.tipoVidro}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, tipoVidro: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.tipoVidro}
                    />

                    <SelectField
                      label="Corrediça"
                      value={ambiente.tipoCorredica}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, tipoCorredica: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.tipoCorredica}
                    />

                    <SelectField
                      label="Dobradiça"
                      value={ambiente.tipoDobradica}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, tipoDobradica: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.tipoDobradica}
                    />

                    <SelectField
                      label="Aventos"
                      value={ambiente.tipoAventos}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, tipoAventos: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.tipoAventos}
                    />

                    <SelectField
                      label="Acessório"
                      value={ambiente.tipoAcessorio}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, tipoAcessorio: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.tipoAcessorio}
                    />

                    <SelectField
                      label="Cabideiro"
                      value={ambiente.tipoCabideiro}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, tipoCabideiro: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.tipoCabideiro}
                    />

                    <SelectField
                      label="LED"
                      value={ambiente.tipoLed}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, tipoLed: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.tipoLed}
                    />

                    <SelectField
                      label="Painel"
                      value={ambiente.tipoPainel}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, tipoPainel: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.tipoPainel}
                    />

                    <SelectField
                      label="Rodapé"
                      value={ambiente.tipoRodape}
                      onChange={(value) => setForm((current) => {
                        const ambientes = [...current.ambientes];
                        ambientes[index] = { ...ambiente, tipoRodape: value };
                        return { ...current, ambientes };
                      })}
                      options={ENUMS.tipoRodape}
                    />

                    <label className="field-group full-span">
                      <span>Observações</span>
                      <textarea
                        rows="3"
                        value={ambiente.observacoes}
                        onChange={(event) => setForm((current) => {
                          const ambientes = [...current.ambientes];
                          ambientes[index] = { ...ambiente, observacoes: event.target.value };
                          return { ...current, ambientes };
                        })}
                      />
                    </label>

                    <button
                      type="button"
                      className="ghost-button full-span"
                      onClick={() => setForm((current) => ({
                        ...current,
                        ambientes: current.ambientes.filter((_, ambienteIndex) => ambienteIndex !== index),
                      }))}
                    >
                      Remover ambiente
                    </button>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="primary-button">
              Salvar projeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}