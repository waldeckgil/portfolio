import { serve } from "https://deno.land/std/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    // Validar variáveis de ambiente SMTP
    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPass = Deno.env.get("SMTP_PASS");

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("Variáveis de ambiente SMTP não configuradas");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Configuração SMTP incompleta. Entre em contato com o administrador."
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }

    const data = await req.json();
    console.log("Dados recebidos para envio de e-mail:", data);

    const client = new SmtpClient();

    await client.connect({
      hostname: smtpHost,
      port: Number(Deno.env.get("SMTP_PORT")) || 587,
      username: smtpUser,
      password: smtpPass,
      tls: true,
    });

    // Formatar o corpo do e-mail
    const emailBody = Object.entries(data)
      .map(([key, value]) => {
        const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const formattedValue = Array.isArray(value) ? value.join(", ") : value;
        return `${formattedKey}: ${formattedValue}`;
      })
      .join("\n");

    console.log("Tentando enviar e-mail...");

    await client.send({
      from: smtpUser,
      to: "waldeckgil@gmail.com",
      subject: "Novo cliente aguarda contato - Portfolio",
      content: `Nova solicitação de contato recebida:\n\n${emailBody}\n\n---\nEnviado automaticamente pelo sistema de portfolio`,
    });

    await client.close();
    console.log("E-mail enviado com sucesso!");

    return new Response(JSON.stringify({
      success: true,
      message: "E-mail enviado com sucesso"
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: unknown) {
    console.error("Erro ao enviar e-mail:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";

    return new Response(
      JSON.stringify({
        success: false,
        error: `Falha ao enviar e-mail: ${errorMessage}`
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
});
