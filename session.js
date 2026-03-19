export function saveSession(req, tokenData) {
  req.session.user = {
    accessToken: tokenData.access_token,
    tokenType:   tokenData.token_type || "Bearer",
    expiresIn:   tokenData.expires_in,
    createdAt:   Date.now(),
  };
}

export function clearSession(req) {
  req.session.destroy();
}
