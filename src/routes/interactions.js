"use strict";

const log4js = require("log4js");
const logger = log4js.getLogger("interactions");
const querystring = require("querystring");
const isEmpty = require("lodash/isEmpty");
const { inspect } = require("util");
const { urlencoded } = require("express");

const body = urlencoded({ extended: false });

module.exports = (app, provider) => {
  const {
    constructor: {
      errors: { SessionNotFound }
    }
  } = provider;

  function setNoCache(req, res, next) {
    res.set("Pragma", "no-cache");
    res.set("Cache-Control", "no-cache, no-store");
    next();
  }
  const keys = new Set();
  const debug = obj =>
    querystring.stringify(
      Object.entries(obj).reduce((acc, [key, value]) => {
        keys.add(key);
        if (isEmpty(value)) return acc;
        acc[key] = inspect(value, { depth: null });
        return acc;
      }, {}),
      "<br/>",
      ": ",
      {
        encodeURIComponent(value) {
          return keys.has(value) ? `<strong>${value}</strong>` : value;
        }
      }
    );

  app.use((req, res, next) => {
    const orig = res.render;
    // you'll probably want to use a full blown render engine capable of layouts
    res.render = (view, locals) => {
      app.render(view, locals, (err, html) => {
        if (err) throw err;
        orig.call(res, "_layout", {
          ...locals,
          body: html
        });
      });
    };
    next();
  });

  app.get("/interaction/:uid", setNoCache, async (req, res, next) => {
    logger.info(`GET /interaction/:uid`);

    const { uid, prompt, params, session } = await provider.interactionDetails(
      req,
      res
    );

    logger.info(JSON.stringify(params));

    switch (prompt.name){
      case 'select_account': {
        return res.render("select_account", {
          title: "Sign-in",
          email: "",
          uid,
          session: session ? debug(session) : undefined,
          dbg: {
            params: debug(params),
            prompt: debug(prompt)
          }
        });
      }
      case 'consent':{
        return res.render("interaction", {
          title: "Authorize",
          email: "",
          uid,
          session: session ? debug(session) : undefined,
          dbg: {
            params: debug(params),
            prompt: debug(prompt)
          }
        });
      }
      case 'login':
      default: {
          return res.render("login", {
            title: "Sign-in",
            email: "",
            uid,
            params,
            session: session ? debug(session) : undefined,
            dbg: {
              params: debug(params),
              prompt: debug(prompt)
            }
          });
        }
    }
  });

  app.post(
    "/interaction/:uid/login",
    setNoCache,
    body,
    async (req, res, next) => {
      logger.info(`POST /interaction/:uid/login`);
      //TODO: Implement me
    }
  );

  app.post(
    "/interaction/:uid/continue",
    setNoCache,
    body,
    async (req, res, next) => {
      logger.info(`POST /interaction/:uid/continue`);
      //TODO: Implement me
    }
  );

  app.post(
    "/interaction/:uid/confirm",
    setNoCache,
    body,
    async (req, res, next) => {
      logger.info(`POST /interaction/:uid/confirm`);
      //TODO: Implement me
    }
  );

  app.get("/interaction/:uid/abort", setNoCache, async (req, res, next) => {
    logger.info(`GET /interaction/:uid/abort`);
    try {
      const result = {
        error: 'access_denied',
        error_description: 'End-User aborted interaction',
      };
      await provider.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
    } catch (err) {
      next(err);
    }
  });

  app.post(
    "/interaction/:uid/federated",
    setNoCache,
    body,
    async (req, res, next) => {
      logger.info(`POST /interaction/:uid/federated`);
      //TODO: Implement me
    }
  );

  app.use((err, req, res, next) => {
    if (err instanceof SessionNotFound) {
      //TODO: Handle interaction expired / session not found error
    }
    next(err);
  });
};
