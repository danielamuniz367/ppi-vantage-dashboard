import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    {
      try {
        // Prisma logic
        const combinedData = await prisma.$queryRaw`
        SELECT
          d.id AS device_id,
          d.display_name AS device_name,
          a.display_name AS agent_name,
          du.uptime AS device_uptime
        FROM device d
        LEFT JOIN agent a ON d.agent_id = a.id
        LEFT JOIN device_uptime du ON d.id = du.device_id
        ORDER BY device_id; 
      `;

        const aggregations = await prisma.device_uptime.aggregate({
          _avg: {
            uptime: true,
          },
        });

        const data = {
          average: aggregations._avg.uptime,
          tableData: combinedData,
        };

        res.status(200).json(data);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred." });
      } finally {
        await prisma.$disconnect();
      }
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
