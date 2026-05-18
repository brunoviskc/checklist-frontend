import React from 'react';
import { ENUMS, formatEnumLabel } from '../constants/backendEnums';

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

function createInitialForm(environment) {
  return {
    nome: environment?.nome || '',
    tipoAmbiente: environment?.tipoAmbiente || '',
    acabamentoInterno: environment?.acabamentoInterno || '',
    acabamentoExterno: environment?.acabamentoExterno || '',
    acabamentoPerfil: environment?.acabamentoPerfil || '',
    acabamentoTelinha: environment?.acabamentoTelinha || '',
    tipoPorta: environment?.tipoPorta || '',
    tipoPortaPassagem: environment?.tipoPortaPassagem || '',
    tipoPuxador: environment?.tipoPuxador || '',
    tipoVidro: environment?.tipoVidro || '',
    tipoCorredica: environment?.tipoCorredica || '',
    tipoDobradica: environment?.tipoDobradica || '',
    tipoAventos: environment?.tipoAventos || '',
    tipoAcessorio: environment?.tipoAcessorio || '',
    tipoCabideiro: environment?.tipoCabideiro || '',
    tipoLed: environment?.tipoLed || '',
    tipoPainel: environment?.tipoPainel || '',
    tipoRodape: environment?.tipoRodape || '',
    observacoes: environment?.observacoes || '',
  };
}

export function EnvironmentFormModal({ open, environment, onClose, onSubmit }) {
  const [form, setForm] = React.useState(createInitialForm(environment));

  React.useEffect(() => {
    if (open) {
      setForm(createInitialForm(environment));
    }
  }, [open, environment]);

  if (!open || !environment) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="editar-ambiente-titulo" onClick={(event) => event.stopPropagation()}>
        <h2 id="editar-ambiente-titulo">Editar ambiente</h2>
        <p>Atualize o nome e os detalhes técnicos deste ambiente.</p>

        <form
          className="project-form"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(form);
          }}
        >
          <div className="form-grid two-columns">
            <label className="field-group full-span">
              <span>Nome do ambiente</span>
              <input
                required
                value={form.nome}
                onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))}
              />
            </label>

            <SelectField
              label="Tipo de ambiente"
              value={form.tipoAmbiente}
              onChange={(value) => setForm((current) => ({ ...current, tipoAmbiente: value }))}
              options={ENUMS.tipoAmbiente}
              required
            />

            <SelectField
              label="Acabamento interno"
              value={form.acabamentoInterno}
              onChange={(value) => setForm((current) => ({ ...current, acabamentoInterno: value }))}
              options={ENUMS.acabamentoInterno}
              required
            />

            <SelectField
              label="Acabamento externo"
              value={form.acabamentoExterno}
              onChange={(value) => setForm((current) => ({ ...current, acabamentoExterno: value }))}
              options={ENUMS.acabamentoExterno}
              required
            />

            <SelectField
              label="Acabamento do perfil"
              value={form.acabamentoPerfil}
              onChange={(value) => setForm((current) => ({ ...current, acabamentoPerfil: value }))}
              options={ENUMS.acabamentoPerfil}
            />

            <SelectField
              label="Telinha"
              value={form.acabamentoTelinha}
              onChange={(value) => setForm((current) => ({ ...current, acabamentoTelinha: value }))}
              options={ENUMS.acabamentoTelinha}
            />

            <SelectField
              label="Tipo de porta"
              value={form.tipoPorta}
              onChange={(value) => setForm((current) => ({ ...current, tipoPorta: value }))}
              options={ENUMS.tipoPorta}
            />

            <SelectField
              label="Tipo de porta passagem"
              value={form.tipoPortaPassagem}
              onChange={(value) => setForm((current) => ({ ...current, tipoPortaPassagem: value }))}
              options={ENUMS.tipoPortaPassagem}
            />

            <SelectField
              label="Puxador"
              value={form.tipoPuxador}
              onChange={(value) => setForm((current) => ({ ...current, tipoPuxador: value }))}
              options={ENUMS.tipoPuxador}
            />

            <SelectField
              label="Vidro"
              value={form.tipoVidro}
              onChange={(value) => setForm((current) => ({ ...current, tipoVidro: value }))}
              options={ENUMS.tipoVidro}
            />

            <SelectField
              label="Corrediça"
              value={form.tipoCorredica}
              onChange={(value) => setForm((current) => ({ ...current, tipoCorredica: value }))}
              options={ENUMS.tipoCorredica}
            />

            <SelectField
              label="Dobradiça"
              value={form.tipoDobradica}
              onChange={(value) => setForm((current) => ({ ...current, tipoDobradica: value }))}
              options={ENUMS.tipoDobradica}
            />

            <SelectField
              label="Aventos"
              value={form.tipoAventos}
              onChange={(value) => setForm((current) => ({ ...current, tipoAventos: value }))}
              options={ENUMS.tipoAventos}
            />

            <SelectField
              label="Acessório"
              value={form.tipoAcessorio}
              onChange={(value) => setForm((current) => ({ ...current, tipoAcessorio: value }))}
              options={ENUMS.tipoAcessorio}
            />

            <SelectField
              label="Cabideiro"
              value={form.tipoCabideiro}
              onChange={(value) => setForm((current) => ({ ...current, tipoCabideiro: value }))}
              options={ENUMS.tipoCabideiro}
            />

            <SelectField
              label="LED"
              value={form.tipoLed}
              onChange={(value) => setForm((current) => ({ ...current, tipoLed: value }))}
              options={ENUMS.tipoLed}
            />

            <SelectField
              label="Painel"
              value={form.tipoPainel}
              onChange={(value) => setForm((current) => ({ ...current, tipoPainel: value }))}
              options={ENUMS.tipoPainel}
            />

            <SelectField
              label="Rodapé"
              value={form.tipoRodape}
              onChange={(value) => setForm((current) => ({ ...current, tipoRodape: value }))}
              options={ENUMS.tipoRodape}
            />

            <label className="field-group full-span">
              <span>Observações</span>
              <textarea
                rows="3"
                value={form.observacoes}
                onChange={(event) => setForm((current) => ({ ...current, observacoes: event.target.value }))}
              />
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="primary-button">
              Salvar ambiente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
