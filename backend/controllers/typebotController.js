const getTypebotResult = async (req, res) => {
  const { resultId } = req.params;
  const typebotId = 'bmx8x5edoxpnnrg806uxgbb9';
  const bearerToken = 'vW4W28nl1NZzzNTTUpHZBXpr';

  if (!resultId) {
    return res.status(400).json({ error: 'Falta resultId' });
  }

  const cleanResultId = resultId.trim(); // 🔑 importante para evitar errores por \n o espacios
  const url = `https://app.typebot.io/api/v1/typebots/${typebotId}/results/${cleanResultId}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'No se pudo obtener el resultado de Typebot' });
    }

    const data = await response.json();
    const variables = {};
    data.result.variables.forEach((v) => {
      variables[v.name] = v.value;
    });

    return res.json({
      resultId: data.result.id,
      createdAt: data.result.createdAt,
      score: variables.score || null,
      puntuacion: variables.puntuacion || null,
      opciones: variables.opciones || null,
      opciones2: variables.opciones2 || null,
      respuestas: data.result.answers || [],
    });
  } catch (err) {
    console.error('Error en backend:', err);
    return res.status(500).json({ error: 'Error interno al obtener resultado' });
  }
};

module.exports = { getTypebotResult };
