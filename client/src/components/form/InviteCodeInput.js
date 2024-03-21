function InviteCodeInput({ value, onChange, onBlur }) {
  return (
    <>
      <label htmlFor="inviteCode">Invite Code</label>
      <input
        id="inviteCode"
        type="text"
        className="input-field"
        placeholder="Invite Code"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
    </>
  );
}

export default InviteCodeInput;
